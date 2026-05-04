resource "random_password" "db" {
  length           = 32
  special          = true
  override_special = "!#$%&*()-_=+[]{}:?"
}

resource "aws_ssm_parameter" "db_password" {
  name  = "/${var.project}/${var.env}/db-password"
  type  = "SecureString"
  value = random_password.db.result
}

resource "aws_db_instance" "main" {
  identifier        = "${var.project}-${var.env}"
  engine            = "postgres"
  engine_version    = "16"
  instance_class    = var.instance_class
  db_name           = var.db_name
  username          = var.db_username
  password          = random_password.db.result

  allocated_storage     = 20
  storage_type          = "gp2"
  storage_encrypted     = true

  db_subnet_group_name   = var.db_subnet_group_name
  vpc_security_group_ids = [var.security_group_id]
  publicly_accessible    = true

  backup_retention_period = var.env == "prod" ? 7 : 1

  auto_minor_version_upgrade = true
  deletion_protection        = var.deletion_protection
  skip_final_snapshot        = var.env != "prod"

  final_snapshot_identifier = var.env == "prod" ? "${var.project}-${var.env}-final" : null

  parameter_group_name = aws_db_parameter_group.main.name

  tags = { Name = "${var.project}-${var.env}" }
}

resource "aws_db_parameter_group" "main" {
  name   = "${var.project}-${var.env}-pg16"
  family = "postgres16"

  parameter {
    name  = "rds.force_ssl"
    value = "1"
  }

  parameter {
    name  = "log_connections"
    value = "1"
  }
}

# Store full connection URL in SSM for GitHub Actions migrations
resource "aws_ssm_parameter" "database_url" {
  name  = "/${var.project}/${var.env}/database-url"
  type  = "SecureString"
  value = "postgresql://${var.db_username}:${urlencode(random_password.db.result)}@${aws_db_instance.main.address}:5432/${var.db_name}?sslmode=require"
}
