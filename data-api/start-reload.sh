#! /usr/bin/env sh
set -e

MODULE_NAME=${MODULE_NAME:-app.main}
VARIABLE_NAME=${VARIABLE_NAME:-app}
export APP_MODULE=${APP_MODULE:-"$MODULE_NAME:$VARIABLE_NAME"}

HOST=${HOST:-0.0.0.0}
PORT=${PORT:-9000}
LOG_LEVEL=${LOG_LEVEL:-info}

PRE_START_PATH=${PRE_START_PATH:-./prestart.sh}
echo "Running script $PRE_START_PATH"
. "$PRE_START_PATH"

# Start Uvicorn with live reload
exec uvicorn --reload --host $HOST --port $PORT --log-level $LOG_LEVEL "$APP_MODULE"
