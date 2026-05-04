resource "random_id" "suffix" {
  byte_length = 4
}

# ─── Networking ───────────────────────────────────────────────────────────────

module "networking" {
  source  = "./modules/networking"
  project = var.project
}

# ─── RDS PostgreSQL ───────────────────────────────────────────────────────────

module "rds" {
  source = "./modules/rds"

  project              = var.project
  env                  = var.env
  instance_class       = var.rds_instance_class
  db_subnet_group_name = module.networking.db_subnet_group_name
  security_group_id    = module.networking.rds_security_group_id
  deletion_protection  = var.rds_deletion_protection
}

# ─── S3 uploads ───────────────────────────────────────────────────────────────

module "s3" {
  source  = "./modules/s3"
  project = var.project
  env     = var.env
  suffix  = random_id.suffix.hex

  allowed_origins = var.app_domain != "" ? [
    "https://${var.app_domain}",
    "https://www.${var.app_domain}",
  ] : ["*"]
}

# ─── SES email (only when a sending domain is provided) ──────────────────────

module "ses" {
  count          = var.sending_domain != "" ? 1 : 0
  source         = "./modules/ses"
  project        = var.project
  env            = var.env
  sending_domain = var.sending_domain
}

# ─── Amplify hosting ──────────────────────────────────────────────────────────

module "amplify" {
  source = "./modules/amplify"

  project    = var.project
  env        = var.env
  aws_region = var.aws_region

  github_repository = var.github_repository
  github_token      = var.github_token
  branch_name  = "main"
  app_domain   = var.app_domain

  database_url         = module.rds.database_url
  nextauth_secret      = var.nextauth_secret
  google_client_id     = var.google_client_id
  google_client_secret = var.google_client_secret

  # Email: prefer SES when domain is set, otherwise fall back to custom SMTP
  ses_smtp_username = var.sending_domain != "" ? module.ses[0].smtp_username : var.smtp_user
  ses_smtp_password = var.sending_domain != "" ? module.ses[0].smtp_password : var.smtp_password
  smtp_host         = var.sending_domain != "" ? "email-smtp.${var.aws_region}.amazonaws.com" : var.smtp_host
  smtp_port         = var.sending_domain != "" ? "587" : var.smtp_port
  smtp_from         = var.sending_domain != "" ? "Urbanhood <noreply@${var.sending_domain}>" : var.smtp_from

  s3_bucket_name       = module.s3.bucket_name
  s3_access_key_id     = module.s3.access_key_id
  s3_secret_access_key = module.s3.secret_access_key
}
