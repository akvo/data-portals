#!/usr/bin/env bash
set -eu

if [[ "${CI_TAG:-}" =~ promote-.* ]]; then
    echo "Skipping build as it is a prod promotion"
    exit 0
fi

function log {
   echo "$(date +"%T") - BUILD INFO - $*"
}

export PROJECT_NAME=akvo-lumen

if [ -z "$CI_COMMIT" ]; then
    export CI_COMMIT=local
fi

log Building backend
docker build -t eu.gcr.io/${PROJECT_NAME}/data-portals-backend:${CI_COMMIT} -t data-portals-backend:prod --rm=false -f backend/Dockerfile ./backend

log Building frontend
docker build -t eu.gcr.io/${PROJECT_NAME}/data-portals-frontend:${CI_COMMIT} -t data-portals-frontend:prod --rm=false -f frontend/Dockerfile ./frontend

log Building nginx
docker build -t eu.gcr.io/${PROJECT_NAME}/data-portals-nginx:${CI_COMMIT} -t data-portals-nginx:prod --rm=false -f nginx/Dockerfile ./nginx

log Done
