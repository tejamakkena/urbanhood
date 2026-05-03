data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# Drop the old separate-resource ingress rule from state without calling
# DeleteSecurityGroupRule (which needs ec2:DeleteSecurityGroupRule, not in policy).
# The inline ingress block below takes over management of this rule.
removed {
  from = aws_vpc_security_group_ingress_rule.rds_postgres
  lifecycle {
    destroy = false
  }
}

# Security group for RDS — allows PostgreSQL from anywhere
# Compensated by: strong password, SSL enforcement, Terraform-managed rotation
resource "aws_security_group" "rds" {
  name        = "${var.project}-rds"
  description = "Allow PostgreSQL access for Urbanhood"
  vpc_id      = data.aws_vpc.default.id

  # Inline blocks use the classic SG API (AuthorizeSecurityGroupIngress /
  # AuthorizeSecurityGroupEgress), which is what the IAM policy grants.
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "PostgreSQL"
  }

  # Explicit allow-all egress preserves AWS's default and prevents Terraform
  # from calling RevokeSecurityGroupEgress to remove it.
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project}-rds" }
}

resource "aws_db_subnet_group" "main" {
  name       = "${var.project}-db-subnet-group"
  subnet_ids = data.aws_subnets.default.ids
}
