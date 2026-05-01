variable "project" {
  type = string
}

variable "env" {
  type = string
}

variable "instance_class" {
  type    = string
  default = "db.t4g.micro"
}

variable "db_name" {
  type    = string
  default = "urbanhood"
}

variable "db_username" {
  type    = string
  default = "urbanhood"
}

variable "db_subnet_group_name" {
  type = string
}

variable "security_group_id" {
  type = string
}

variable "deletion_protection" {
  type    = bool
  default = false
}
