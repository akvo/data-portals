#!/usr/bin/env bash

set -e

pytest --cov=app --cov=tests --cov-report=term-missing ${@}
