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

# ─── SES email ────────────────────────────────────────────────────────────────

module "ses" {
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
  branch_name       = "main"
  app_domain        = var.app_domain
  sending_domain    = var.sending_domain

  database_url         = module.rds.database_url
  nextauth_secret      = var.nextauth_secret
  google_client_id     = var.google_client_id
  google_client_secret = var.google_client_secret

  ses_smtp_username = module.ses.smtp_username
  ses_smtp_password = module.ses.smtp_password

  s3_bucket_name       = module.s3.bucket_name
  s3_access_key_id     = module.s3.access_key_id
  s3_secret_access_key = module.s3.secret_access_key
}
