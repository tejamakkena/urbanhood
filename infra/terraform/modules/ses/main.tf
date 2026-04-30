resource "aws_sesv2_email_identity" "domain" {
  email_identity = var.sending_domain

  dkim_signing_attributes {
    next_signing_key_length = "RSA_2048_BIT"
  }
}

resource "aws_sesv2_email_identity_mail_from_attributes" "domain" {
  email_identity   = aws_sesv2_email_identity.domain.email_identity
  mail_from_domain = "mail.${var.sending_domain}"
}

# IAM user for SMTP credentials
resource "aws_iam_user" "ses_smtp" {
  name = "${var.project}-ses-smtp-${var.env}"
}

resource "aws_iam_user_policy" "ses_smtp" {
  name = "ses-send-email"
  user = aws_iam_user.ses_smtp.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["ses:SendRawEmail"]
      Resource = "*"
    }]
  })
}

resource "aws_iam_access_key" "ses_smtp" {
  user = aws_iam_user.ses_smtp.name
}

resource "aws_ssm_parameter" "smtp_username" {
  name  = "/${var.project}/${var.env}/ses-smtp-username"
  type  = "SecureString"
  value = aws_iam_access_key.ses_smtp.id
}

resource "aws_ssm_parameter" "smtp_password" {
  name  = "/${var.project}/${var.env}/ses-smtp-password"
  type  = "SecureString"
  value = aws_iam_access_key.ses_smtp.ses_smtp_password_v4
}
