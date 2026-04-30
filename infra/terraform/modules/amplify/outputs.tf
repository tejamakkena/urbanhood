output "app_id" {
  value = aws_amplify_app.main.id
}

output "app_arn" {
  value = aws_amplify_app.main.arn
}

output "default_domain" {
  value = aws_amplify_app.main.default_domain
}

output "app_url" {
  value = var.app_domain != "" ? "https://${var.app_domain}" : "https://${aws_amplify_branch.main.branch_name}.${aws_amplify_app.main.default_domain}"
}
