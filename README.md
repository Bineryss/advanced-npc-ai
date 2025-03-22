# JavaScript Development Environment Template

This repository serves as a template for setting up a robust JavaScript development environment using Docker, pnpm, and GitHub Actions. It provides a consistent and reproducible development setup across different machines and platforms.

## Features

- **Docker-based Development Environment**: Ensures consistency across different development machines.
- **pnpm Package Manager**: Efficient and fast package management for Node.js projects.
- **GitHub Actions Integration**: Includes a basic workflow for building and testing Docker images.
- **Act for Local GitHub Actions Testing**: Allows testing of GitHub Actions workflows locally.
- **VSCode DevContainer Support**: Provides a pre-configured development container for VSCode.

## Contents

### Dockerfile

The Dockerfile sets up the development environment with:

- Node.js
- pnpm package manager
- Docker CLI (for Docker-in-Docker operations)
- Act (for local GitHub Actions testing)
- GitHub CLI

### devcontainer.json

Configures the VSCode DevContainer with:

- Mounting of Docker socket and pnpm cache
- VSCode extensions for ESLint, Prettier, and Docker
- GitHub Actions extension

### GitHub Actions Workflow

Located in `.github/workflows/docker-build.yml`, this workflow:

- Triggers on pushes to main and pull requests
- Builds the Docker image
- Runs basic tests to verify the image