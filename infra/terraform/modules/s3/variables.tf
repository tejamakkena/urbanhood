variable "project" { type = string }
variable "env" { type = string }

variable "suffix" {
  description = "Random suffix to ensure bucket name uniqueness"
  type        = string
}

variable "allowed_origins" {
  type    = list(string)
  default = ["*"]
}
