variable "project_id" {
  type        = string
  description = "GCP project ID where dev resources are created"
}

variable "region" {
  type        = string
  description = "GCP region to deploy resources in"
  default     = "us-east4"
}

# Useful to see how variables flow into resources
variable "secret_id" {
  type        = string
  description = "ID (name) of the Secret Manager secret to create"
  default     = "demo-tf-secret-variables"
}

variable "github_owner" {
  type        = string
  description = "GitHub org or username that owns the repo (e.g., 'my-org' or 'my-user')"
}

variable "github_repo" {
  type        = string
  description = "GitHub repository name (without owner), e.g., 'my-infra-repo'"
}

variable "github_branch" {
  type        = string
  description = "GitHub branch allowed to use WIF for this env"
  default     = "dev"
}
