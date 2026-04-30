output "endpoint" {
  value = aws_db_instance.main.address
}

output "port" {
  value = aws_db_instance.main.port
}

output "db_name" {
  value = aws_db_instance.main.db_name
}

output "username" {
  value = aws_db_instance.main.username
}

output "database_url" {
  value     = aws_ssm_parameter.database_url.value
  sensitive = true
}

output "ssm_database_url_name" {
  value = aws_ssm_parameter.database_url.name
}
