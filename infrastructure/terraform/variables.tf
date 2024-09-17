variable "project_id" {
  description = "The ID of the Google Cloud project"
  type        = string
}

variable "region" {
  description = "The region to deploy resources"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "The zone within the region to deploy resources"
  type        = string
  default     = "us-central1-a"
}

variable "environment" {
  description = "The environment (e.g., dev, staging, prod)"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Valid values for var: environment are (dev, staging, prod)."
  }
}

variable "storage_bucket_names" {
  description = "List of storage bucket names to create"
  type        = list(string)
}

variable "database_name" {
  description = "The name of the database to create"
  type        = string
}

variable "database_version" {
  description = "The version of the database engine"
  type        = string
  default     = "POSTGRES_13"
}

variable "database_tier" {
  description = "The machine type to use for the database instance"
  type        = string
  default     = "db-f1-micro"
}

variable "vpc_network_name" {
  description = "The name of the VPC network to create"
  type        = string
  default     = "main-vpc"
}

variable "vpc_subnet_cidr" {
  description = "The CIDR range for the VPC subnet"
  type        = string
  default     = "10.0.0.0/24"
}

# HUMAN ASSISTANCE NEEDED
# Consider adding more specific database configuration variables if needed, such as:
# - database_user
# - database_password (should be handled securely, possibly using Terraform's sensitive input variables)
# - database_backup_configuration
# - database_maintenance_window
# Also, consider adding more VPC configuration variables if needed, such as:
# - vpc_routing_mode
# - vpc_auto_create_subnetworks