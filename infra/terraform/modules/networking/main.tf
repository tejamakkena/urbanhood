data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# Security group for RDS — allows PostgreSQL from anywhere
# Compensated by: strong password, SSL enforcement, Terraform-managed rotation
resource "aws_security_group" "rds" {
  name        = "${var.project}-rds"
  description = "Allow PostgreSQL access for Urbanhood"
  vpc_id      = data.aws_vpc.default.id

  tags = { Name = "${var.project}-rds" }
}

resource "aws_vpc_security_group_ingress_rule" "rds_postgres" {
  security_group_id = aws_security_group.rds.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 5432
  to_port           = 5432
  ip_protocol       = "tcp"
  description       = "PostgreSQL"
}

resource "aws_db_subnet_group" "main" {
  name       = "${var.project}-db-subnet-group"
  subnet_ids = data.aws_subnets.default.ids
}
