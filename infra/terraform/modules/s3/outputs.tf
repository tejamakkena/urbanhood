output "bucket_name" {
  value = aws_s3_bucket.uploads.id
}

output "bucket_arn" {
  value = aws_s3_bucket.uploads.arn
}

output "access_key_id" {
  value     = aws_iam_access_key.uploads.id
  sensitive = true
}

output "secret_access_key" {
  value     = aws_iam_access_key.uploads.secret
  sensitive = true
}
