#!/usr/bin/env bash

set -eu

function log {
   echo "$(date +"%T") - BUILD INFO - $*"
}

log Running deployment script
export PROJECT_NAME=akvo-lumen

if [[ "${CI_BRANCH}" != "master" ]] && [[ ! "${CI_TAG:-}" =~ promote-.* ]]; then
    exit 0
fi

if [[ "${CI_PULL_REQUEST}" != "false" ]]; then
    exit 0
fi

log Authentication with gcloud and kubectl
gcloud auth activate-service-account --key-file=/home/semaphore/.secrets/gcp.json
gcloud config set project akvo-lumen
gcloud config set container/cluster europe-west1-d
gcloud config set compute/zone europe-west1-d
gcloud config set container/use_client_certificate False

if [[ "${CI_TAG:-}" =~ promote-.* ]]; then
    log Environment is production
    gcloud container clusters get-credentials production
    K8S_CONFIG_FILE=ci/k8s/config-prod.yml
else
    log Environement is test
    gcloud container clusters get-credentials test
    K8S_CONFIG_FILE=ci/k8s/config-test.yml

    log Pushing images
    gcloud auth configure-docker
    docker push eu.gcr.io/${PROJECT_NAME}/data-portals-api:${CI_COMMIT}
    docker push eu.gcr.io/${PROJECT_NAME}/data-portals-mali:${CI_COMMIT}
    docker push eu.gcr.io/${PROJECT_NAME}/data-portals-sierra-leone:${CI_COMMIT}
    docker push eu.gcr.io/${PROJECT_NAME}/data-portals-nginx:${CI_COMMIT}
fi

sed -e "s/\${TRAVIS_COMMIT}/$CI_COMMIT/" ci/k8s/deployment.yml > deployment.yml.tmp
# 
kubectl apply -f ${K8S_CONFIG_FILE}
kubectl apply -f ci/k8s/service.yml
kubectl apply -f deployment.yml.tmp

#
# log Waiting for k8s to finish
./ci/k8s/helpers/wait-for-k8s-deployment-to-be-ready.sh
