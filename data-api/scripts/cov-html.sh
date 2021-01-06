#!/usr/bin/env bash

set -e

bash scripts/test.sh --cov-report=html ${@}
