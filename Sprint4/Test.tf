terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">=3.0.0"
    }
    azapi = {
      source = "azure/azapi"
    }
  }
}

provider "azurerm" {
  features {}
}

provider "azapi" {
}

variable "existing_workspace_id" {
  type        = string
  description = "Existing Fabric Workspace ID"
}

# Lakehouse
resource "azapi_resource" "lakehouse" {
  type      = "Microsoft.Fabric/workspaces/items@2024-03-01"
  name      = "my-lakehouse"
  parent_id = var.existing_workspace_id

  body = jsonencode({
    properties = {
      displayName = "analytics-lakehouse"
      description = "Terraform-managed Lakehouse"
      type        = "Lakehouse"
      settings    = {
        format = "delta"
      }
    }
  })
}

# Eventhouse
resource "azapi_resource" "eventhouse" {
  type      = "Microsoft.Fabric/workspaces/items@2024-03-01"
  name      = "my-eventhouse"
  parent_id = var.existing_workspace_id

  body = jsonencode({
    properties = {
      displayName = "iot-eventhouse"
      description = "Terraform-managed Eventhouse"
      type        = "Eventhouse"
    }
  })
}

# KQL Database
resource "azapi_resource" "kql_database" {
  type      = "Microsoft.Fabric/workspaces/items@2024-03-01"
  name      = "my-kql-db"
  parent_id = var.existing_workspace_id

  body = jsonencode({
    properties = {
      displayName = "logs-database"
      description = "Terraform-managed KQL Database"
      type        = "KustoDatabase"
      settings    = {
        kustoClusterId = "<EXISTING_KUSTO_CLUSTER_ID>"
      }
    }
  })
}

# Notebook
resource "azapi_resource" "notebook" {
  type      = "Microsoft.Fabric/workspaces/items@2024-03-01"
  name      = "my-notebook"
  parent_id = var.existing_workspace_id

  body = jsonencode({
    properties = {
      displayName = "data-processing-notebook"
      description = "Terraform-managed Notebook"
      type        = "Notebook"
      settings    = {
        format = "ipynb"
      }
    }
  })
}

# Environment
resource "azapi_resource" "environment" {
  type      = "Microsoft.Fabric/workspaces/environments@2024-03-01"
  name      = "my-environment"
  parent_id = var.existing_workspace_id

  body = jsonencode({
    properties = {
      displayName        = "prod-environment"
      description        = "Terraform-managed Environment"
      environmentType    = "Prod"
      sparkCompute       = {
        computeType = "Spark"
        coreCount   = 8
      }
      catalogSettings    = {
        enabled = true
      }
    }
  })
}

output "resource_ids" {
  value = {
    lakehouse     = azapi_resource.lakehouse.id
    eventhouse    = azapi_resource.eventhouse.id
    kql_database  = azapi_resource.kql_database.id
    notebook      = azapi_resource.notebook.id
    environment   = azapi_resource.environment.id
  }
}
