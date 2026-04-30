output "state_bucket_name" {
  description = "Add this as GitHub Secret: TF_STATE_BUCKET"
  value       = aws_s3_bucket.tf_state.id
}

output "lock_table_name" {
  description = "Add this as GitHub Secret: TF_LOCK_TABLE"
  value       = aws_dynamodb_table.tf_locks.name
}

output "github_actions_role_arn" {
  description = "Add this as GitHub Secret: AWS_ROLE_ARN"
  value       = aws_iam_role.github_actions.arn
}

output "oidc_provider_arn" {
  value = aws_iam_openid_connect_provider.github.arn
}
