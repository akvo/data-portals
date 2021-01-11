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

log Building data api
docker build -t eu.gcr.io/${PROJECT_NAME}/data-portals-api:${CI_COMMIT} -t data-portals-api:prod --rm=false -f data-api/Dockerfile ./data-api

log Building mali portal
docker build -t eu.gcr.io/${PROJECT_NAME}/data-portals-mali:${CI_COMMIT} -t data-portals-mali:prod --rm=false -f mali-portal/Dockerfile ./mali-portal

log Building sierra leone portal
docker build -t eu.gcr.io/${PROJECT_NAME}/data-portals-sierra-leone:${CI_COMMIT} -t data-portals-sierra-leone:prod --rm=false -f sierra-leone-portal/Dockerfile ./sierra-leone-portal

log Building nginx
docker build -t eu.gcr.io/${PROJECT_NAME}/data-portals-nginx:${CI_COMMIT} -t data-portals-nginx:prod --rm=false -f nginx/Dockerfile ./nginx

log Done
