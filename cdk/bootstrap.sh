#!/bin/bash
set -a
source .env
set +a
cdk bootstrap aws://$AWS_ACCOUNT_ID/$AWS_REGION "$@"