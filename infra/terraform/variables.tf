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

# Domain
variable "sending_domain" {
  description = "Domain used for SES sending (must be a domain you own)"
  type        = string
}

variable "app_domain" {
  description = "Custom domain for the web app (leave empty to use Amplify default)"
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
  default = "db.t4g.micro"
}

variable "rds_deletion_protection" {
  type    = bool
  default = false
}
