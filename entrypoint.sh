#!/bin/sh

# Set default values if variables are not set
export FRONTEND_HOST=${FRONTEND_HOST:-frontendprod}
export FRONTEND_PORT=${FRONTEND_PORT:-3000}
export BACKEND_HOST=${BACKEND_HOST:-backendprod}
export BACKEND_PORT=${BACKEND_PORT:-8000}
export NGINX_PORT=${NGINX_PORT:-80}
export NGINX_SERVER_NAME=${NGINX_SERVER_NAME:-localhost}

# Substitute environment variables in the template
envsubst '$FRONTEND_HOST $FRONTEND_PORT $BACKEND_HOST $BACKEND_PORT $NGINX_PORT $NGINX_SERVER_NAME' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start Nginx in the foreground
exec nginx -g 'daemon off;'