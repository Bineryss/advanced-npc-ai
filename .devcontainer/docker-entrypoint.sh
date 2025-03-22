#!/bin/bash

DOCKER_SOCKET=/var/run/docker.sock
CACHE_DIR=/home/node/.cache

echo "Adjusting permissions for Docker socket..."
if [ -S $DOCKER_SOCKET ]; then
  DOCKER_GID=$(stat -c "%g" $DOCKER_SOCKET)
  echo "Docker socket found with GID: $DOCKER_GID"

  # Check if a group with this GID already exists
  EXISTING_GROUP=$(getent group $DOCKER_GID | cut -d: -f1)
  if [ -z "$EXISTING_GROUP" ]; then
    echo "Creating group 'docker-host' with GID $DOCKER_GID"
    groupadd -g $DOCKER_GID docker-host
  else
    echo "Using existing group '$EXISTING_GROUP'"
  fi

  # Add 'node' user to this group
  echo "Adding 'node' user to group '${EXISTING_GROUP:-docker-host}'"
  usermod -aG ${EXISTING_GROUP:-docker-host} node

else
  echo "Warning: Docker socket ($DOCKER_SOCKET) not found or not a valid socket. Docker CLI may not work."
fi

# Ensure pnpm cache directory exists
if [ ! -d $CACHE_DIR ]; then
  mkdir -p $CACHE_DIR
  echo "Created $CACHE_DIR"
fi

# Change ownership to 'node' user for both directories
chown -R node:node $CACHE_DIR
echo "Ownership of $CACHE_DIR set to 'node:node'"



# Execute original entrypoint or passed command(s)
exec "$@"
