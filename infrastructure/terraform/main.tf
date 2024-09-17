# Main Terraform configuration file for provisioning Google Cloud Platform resources

# Provider configuration for Google Cloud
provider "google" {
  project = var.project_id
  region  = var.region
}

# Google Cloud Storage buckets
resource "google_storage_bucket" "data_lake" {
  name     = "${var.project_id}-data-lake"
  location = var.region
  force_destroy = true
  uniform_bucket_level_access = true
}

resource "google_storage_bucket" "processed_data" {
  name     = "${var.project_id}-processed-data"
  location = var.region
  force_destroy = true
  uniform_bucket_level_access = true
}

# Google Cloud SQL instance
resource "google_sql_database_instance" "main" {
  name             = "main-instance"
  database_version = "POSTGRES_13"
  region           = var.region

  settings {
    tier = "db-f1-micro"
  }

  deletion_protection = false
}

# Google Cloud Functions
resource "google_cloudfunctions_function" "data_processor" {
  name        = "data-processor"
  description = "Function to process incoming data"
  runtime     = "python39"

  available_memory_mb   = 256
  source_archive_bucket = google_storage_bucket.data_lake.name
  source_archive_object = "functions/data_processor.zip"
  trigger_http          = true
  entry_point           = "process_data"
}

# Google Cloud Pub/Sub topics and subscriptions
resource "google_pubsub_topic" "data_ingestion" {
  name = "data-ingestion-topic"
}

resource "google_pubsub_subscription" "data_ingestion_sub" {
  name  = "data-ingestion-subscription"
  topic = google_pubsub_topic.data_ingestion.name

  ack_deadline_seconds = 20
}

# Google Cloud IAM roles and permissions
resource "google_project_iam_member" "function_invoker" {
  project = var.project_id
  role    = "roles/cloudfunctions.invoker"
  member  = "serviceAccount:${var.project_id}@appspot.gserviceaccount.com"
}

# Google Cloud VPC network and subnets
resource "google_compute_network" "main" {
  name                    = "main-network"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "private" {
  name          = "private-subnet"
  ip_cidr_range = "10.0.0.0/24"
  region        = var.region
  network       = google_compute_network.main.id
}

# HUMAN ASSISTANCE NEEDED
# The following resources may need additional configuration based on specific project requirements:
# - Additional IAM roles and permissions
# - Firewall rules for the VPC network
# - Cloud SQL database and user creation
# - Cloud Function deployment and configuration
# Please review and adjust as necessary for production readiness.