#! /usr/bin/env bash
set -e

# Let the DB start
python ./wait_for_database.py

# Run migrations
# alembic upgrade head
