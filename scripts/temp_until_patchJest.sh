#!/bin/sh

echo "Patching jest 24.9"
patch -p1 -N < ./scripts/temp_until_jest24.patch || true
