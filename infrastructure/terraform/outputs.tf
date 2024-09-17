output "storage_bucket_urls" {
  description = "URLs of the created storage buckets"
  value = {
    raw_data_bucket     = google_storage_bucket.raw_data.url
    processed_data_bucket = google_storage_bucket.processed_data.url
  }
}

output "database_connection_strings" {
  description = "Connection strings for the databases"
  value = {
    postgres = google_sql_database_instance.postgres.connection_name
    mongodb  = google_compute_instance.mongodb.network_interface[0].network_ip
  }
  sensitive = true
}

output "cloud_function_urls" {
  description = "URLs of the deployed Cloud Functions"
  value = {
    data_ingestion   = google_cloudfunctions_function.data_ingestion.https_trigger_url
    data_processing  = google_cloudfunctions_function.data_processing.https_trigger_url
    data_analysis    = google_cloudfunctions_function.data_analysis.https_trigger_url
  }
}

output "vpc_network_details" {
  description = "Details of the VPC network"
  value = {
    name    = google_compute_network.vpc_network.name
    id      = google_compute_network.vpc_network.id
    subnets = google_compute_subnetwork.subnets[*].name
  }
}

output "iam_service_account_keys" {
  description = "IAM service account keys"
  value = {
    data_ingestion  = google_service_account_key.data_ingestion.private_key
    data_processing = google_service_account_key.data_processing.private_key
    data_analysis   = google_service_account_key.data_analysis.private_key
  }
  sensitive = true
}

# HUMAN ASSISTANCE NEEDED
# Please review the following:
# 1. Ensure that all resources referenced in the outputs are actually defined in your Terraform configuration.
# 2. Verify that the attribute names (e.g., 'url', 'connection_name', 'https_trigger_url') are correct for your specific resource types and provider versions.
# 3. Consider if any additional outputs are needed based on your specific infrastructure requirements.
# 4. Evaluate if any of these outputs should be marked as sensitive to prevent them from being displayed in logs or console output.