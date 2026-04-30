variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "state_bucket_name" {
  description = "S3 bucket name for Terraform state (must be globally unique)"
  type        = string
}

variable "lock_table_name" {
  description = "DynamoDB table name for Terraform state locking"
  type        = string
  default     = "urbanhood-tf-locks"
}

variable "github_repo" {
  description = "GitHub repo in owner/name format"
  type        = string
  default     = "tejamakkena/urbanhood"
}
