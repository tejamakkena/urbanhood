variable "project" { type = string }
variable "env" { type = string }
variable "aws_region" { type = string }

variable "github_repository" {
  description = "Full GitHub repo URL e.g. https://github.com/tejamakkena/urbanhood"
  type        = string
}

variable "github_token" {
  description = "GitHub PAT with repo scope for Amplify"
  type        = string
  sensitive   = true
}

variable "branch_name" {
  type    = string
  default = "main"
}

variable "app_domain" {
  description = "Custom domain (leave empty to use Amplify default domain)"
  type        = string
  default     = ""
}

variable "sending_domain" {
  type = string
}

# App secrets — passed from SSM outputs or GitHub Secrets
variable "database_url" {
  type      = string
  sensitive = true
}
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
variable "ses_smtp_username" {
  type      = string
  sensitive = true
}
variable "ses_smtp_password" {
  type      = string
  sensitive = true
}
variable "smtp_host" {
  type = string
}
variable "smtp_port" {
  type    = string
  default = "587"
}
variable "smtp_from" {
  type = string
}
variable "s3_bucket_name" {
  type = string
}
variable "s3_access_key_id" {
  type      = string
  sensitive = true
}
variable "s3_secret_access_key" {
  type      = string
  sensitive = true
}
