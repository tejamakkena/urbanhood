output "amplify_app_id" {
  description = "Add as GitHub Secret: AMPLIFY_APP_ID"
  value       = module.amplify.app_id
}

output "amplify_app_url" {
  value = module.amplify.app_url
}

output "rds_endpoint" {
  value = module.rds.endpoint
}

output "ssm_database_url_name" {
  description = "SSM parameter name for the DATABASE_URL (used in db-migrate workflow)"
  value       = module.rds.ssm_database_url_name
}

output "s3_bucket_name" {
  value = module.s3.bucket_name
}

output "ses_dns_records" {
  description = "Add these CNAME records to your DNS to verify SES domain"
  value       = module.ses.dkim_tokens
}

output "ses_mail_from_domain" {
  description = "Add MX record pointing to feedback-smtp.<region>.amazonses.com (priority 10)"
  value       = module.ses.mail_from_domain
}
