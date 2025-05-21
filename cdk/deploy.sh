#!/bin/bash
set -a
source .env
set +a
cdk deploy "$@"