terraform {
  required_version = ">= 1.7.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  # Remote backend using the bucket created in infra/bootstrap
  backend "gcs" {
    bucket = "regainflow-tf-state-dev"  # from bootstrap step
    prefix = "dev/terraform.tfstate"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}


resource "google_project_service" "secretmanager" {
  project = var.project_id
  service = "secretmanager.googleapis.com"

  disable_on_destroy = false
}

resource "google_secret_manager_secret" "demo" {
  project   = var.project_id
  secret_id = var.secret_id

  # Best practice: automatic multi-region replication
  replication {
    auto {}
  }

  # Explicitly ensure the API is enabled before we try to create a secret.
  depends_on = [google_project_service.secretmanager]
}

resource "google_secret_manager_secret_version" "demo_initial" {
  secret = google_secret_manager_secret.demo.name
  secret_data = "this-is-a-demo-value-not-a-real-secret"
}
