#!/bin/bash

# Check and install required dependencies
echo "Checking and installing required dependencies..."
if ! command -v python3 &> /dev/null; then
    echo "Python 3 not found. Installing..."
    sudo apt-get update
    sudo apt-get install -y python3
fi

if ! command -v pip3 &> /dev/null; then
    echo "pip3 not found. Installing..."
    sudo apt-get install -y python3-pip
fi

if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing..."
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

if ! command -v gcloud &> /dev/null; then
    echo "Google Cloud SDK not found. Installing..."
    curl https://sdk.cloud.google.com | bash
    exec -l $SHELL
fi

# Set up virtual environment for Python
echo "Setting up Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install Python packages from requirements.txt
echo "Installing Python packages..."
pip install -r requirements.txt

# Set up Node.js environment and install npm packages
echo "Setting up Node.js environment and installing npm packages..."
npm install

# Configure Google Cloud SDK
echo "Configuring Google Cloud SDK..."
gcloud init

# Set up local development database
echo "Setting up local development database..."
# HUMAN ASSISTANCE NEEDED
# The specific database system and configuration details are not provided.
# Please specify the database system (e.g., PostgreSQL, MySQL) and provide necessary details like database name, user, and password.
# Example for PostgreSQL:
# sudo -u postgres psql -c "CREATE DATABASE myapp_dev;"
# sudo -u postgres psql -c "CREATE USER myapp_user WITH PASSWORD 'mypassword';"
# sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE myapp_dev TO myapp_user;"

echo "Environment setup complete!"