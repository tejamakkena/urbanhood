terraform {
  required_version = ">= 1.9"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }

  backend "s3" {
    # Values supplied via -backend-config in GitHub Actions
    # bucket         = var.TF_STATE_BUCKET
    # key            = "urbanhood/prod/terraform.tfstate"
    # region         = var.AWS_REGION
    # dynamodb_table = var.TF_LOCK_TABLE
    # encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Project     = "urbanhood"
      Environment = var.env
      ManagedBy   = "terraform"
    }
  }
}
