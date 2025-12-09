variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "bucket_name" {
  type        = string
  description = "The name of the storage bucket."
}

variable "bucket_location" {
  type        = string
  default     = "US"
}

variable "region" {
  type        = string
  default     = "us-east4"
}