#!/usr/bin/env bash

set -ex

autoflake --remove-all-unused-imports --recursive --remove-unused-variables --in-place .
black .
isort .
