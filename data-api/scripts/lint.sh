#!/usr/bin/env bash

set -e

mypy app
black . --check
isort . --check-only
flake8 .
