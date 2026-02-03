#!/bin/sh
set -e

# Fix permissions on /data volume if it exists and is writable by root
# Railway/cloud platforms mount volumes that may have root ownership
if [ -d "/data" ] && [ -w "/data" ] || [ "$(stat -c '%u' /data 2>/dev/null || echo 1000)" = "0" ]; then
  echo "Fixing /data permissions for node user..."
  chown -R node:node /data 2>/dev/null || true
fi

# Switch to node user and execute the command
exec su-exec node "$@"
