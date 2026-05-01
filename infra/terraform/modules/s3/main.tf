resource "aws_s3_bucket" "uploads" {
  bucket = "${var.project}-uploads-${var.env}-${var.suffix}"
}

resource "aws_s3_bucket_public_access_block" "uploads" {
  bucket                  = aws_s3_bucket.uploads.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "uploads" {
  bucket = aws_s3_bucket.uploads.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}

resource "aws_s3_bucket_cors_configuration" "uploads" {
  bucket = aws_s3_bucket.uploads.id
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST"]
    allowed_origins = var.allowed_origins
    expose_headers  = ["ETag"]
    max_age_seconds = 3600
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "uploads" {
  bucket = aws_s3_bucket.uploads.id
  rule {
    id     = "abort-incomplete-multipart"
    status = "Enabled"
    filter {}
    abort_incomplete_multipart_upload { days_after_initiation = 7 }
  }
}

# IAM user for S3 access from the app
resource "aws_iam_user" "uploads" {
  name = "${var.project}-uploads-${var.env}"
}

resource "aws_iam_access_key" "uploads" {
  user = aws_iam_user.uploads.name
}

resource "aws_iam_user_policy" "uploads" {
  name = "s3-uploads"
  user = aws_iam_user.uploads.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"]
      Resource = "${aws_s3_bucket.uploads.arn}/*"
    }]
  })
}

resource "aws_ssm_parameter" "s3_access_key" {
  name  = "/${var.project}/${var.env}/s3-access-key-id"
  type  = "SecureString"
  value = aws_iam_access_key.uploads.id
}

resource "aws_ssm_parameter" "s3_secret_key" {
  name  = "/${var.project}/${var.env}/s3-secret-access-key"
  type  = "SecureString"
  value = aws_iam_access_key.uploads.secret
}
