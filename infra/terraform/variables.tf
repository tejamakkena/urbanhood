variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "env" {
  type    = string
  default = "prod"
}

variable "project" {
  type    = string
  default = "urbanhood"
}

# GitHub
variable "github_repository" {
  description = "Full GitHub HTTPS URL of the repo"
  type        = string
  default     = "https://github.com/tejamakkena/urbanhood"
}

variable "github_token" {
  description = "GitHub PAT (classic) with repo scope — used by Amplify to pull source"
  type        = string
  sensitive   = true
}

# Domain — both optional until you own a domain
variable "sending_domain" {
  description = "Domain used for SES sending. Leave empty to use custom SMTP (e.g. Resend) instead."
  type        = string
  default     = ""
}

variable "app_domain" {
  description = "Custom domain for the web app. Leave empty to use the Amplify default *.amplifyapp.com domain."
  type        = string
  default     = ""
}

# Custom SMTP — used when sending_domain is empty (e.g. Resend free tier)
variable "smtp_host" {
  description = "SMTP host when not using SES (e.g. smtp.resend.com)"
  type        = string
  default     = ""
}

variable "smtp_port" {
  type    = string
  default = "587"
}

variable "smtp_user" {
  description = "SMTP username (for Resend this is the literal string 'resend')"
  type        = string
  default     = ""
}

variable "smtp_password" {
  description = "SMTP password / API key"
  type        = string
  sensitive   = true
  default     = ""
}

variable "smtp_from" {
  description = "From address shown to recipients (e.g. onboarding@resend.dev for Resend free tier)"
  type        = string
  default     = ""
}

# Auth / OAuth
variable "nextauth_secret" {
  type      = string
  sensitive = true
}

variable "google_client_id" {
  type = string
}

variable "google_client_secret" {
  type      = string
  sensitive = true
}

# RDS
variable "rds_instance_class" {
  type    = string
  default = "db.t3.micro"
}

variable "rds_deletion_protection" {
  type    = bool
  default = false
}
