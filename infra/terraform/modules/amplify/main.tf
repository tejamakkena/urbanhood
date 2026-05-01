resource "aws_iam_role" "amplify" {
  name = "${var.project}-amplify-${var.env}"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Action    = "sts:AssumeRole"
      Principal = { Service = "amplify.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "amplify_ssm" {
  role       = aws_iam_role.amplify.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess"
}

resource "aws_amplify_app" "main" {
  name         = "${var.project}-${var.env}"
  repository   = var.github_repository
  access_token = var.github_token
  platform     = "WEB_COMPUTE"

  iam_service_role_arn = aws_iam_role.amplify.arn

  # Read amplify.yml from the repo root
  build_spec = null

  environment_variables = {
    DATABASE_URL              = var.database_url
    NEXTAUTH_SECRET           = var.nextauth_secret
    NEXTAUTH_URL              = "https://${var.app_domain}"
    NEXT_PUBLIC_APP_URL       = "https://${var.app_domain}"
    GOOGLE_CLIENT_ID          = var.google_client_id
    GOOGLE_CLIENT_SECRET      = var.google_client_secret
    EMAIL_SERVER_HOST         = var.smtp_host
    EMAIL_SERVER_PORT         = var.smtp_port
    EMAIL_SERVER_USER         = var.ses_smtp_username
    EMAIL_SERVER_PASSWORD     = var.ses_smtp_password
    EMAIL_FROM                = var.smtp_from
    AWS_S3_BUCKET             = var.s3_bucket_name
    AWS_S3_REGION             = var.aws_region
    AWS_S3_ACCESS_KEY_ID      = var.s3_access_key_id
    AWS_S3_SECRET_ACCESS_KEY  = var.s3_secret_access_key
    NODE_ENV                  = "production"
    _LIVE_UPDATES             = jsonencode([{ pkg = "next", type = "framework", version = "latest" }])
  }

  auto_branch_creation_config {
    enable_auto_build = false
  }

  lifecycle {
    ignore_changes = [access_token]
  }
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.main.id
  branch_name = var.branch_name

  # Deployments are triggered manually by GitHub Actions after migrations run
  enable_auto_build = false

  framework = "Next.js - SSR"
  stage     = var.env == "prod" ? "PRODUCTION" : "DEVELOPMENT"

  environment_variables = {}
}

resource "aws_amplify_domain_association" "main" {
  count  = var.app_domain != "" ? 1 : 0
  app_id = aws_amplify_app.main.id
  domain_name = var.app_domain

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = ""
  }

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www"
  }
}
