output "dkim_tokens" {
  description = "Add these as CNAME records in your DNS: <token>._domainkey.<domain> -> <token>.dkim.amazonses.com"
  value       = aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens
}

output "mail_from_domain" {
  description = "Add MX record: mail.<domain> -> feedback-smtp.<region>.amazonses.com (priority 10)"
  value       = "mail.${var.sending_domain}"
}

output "smtp_username" {
  value     = aws_iam_access_key.ses_smtp.id
  sensitive = true
}

output "smtp_password" {
  value     = aws_iam_access_key.ses_smtp.ses_smtp_password_v4
  sensitive = true
}
