#!/usr/bin/env bash

RET=`telnet REDIS_HOST PORT << EOF
LRANGE mylist 0 -1
EOF`

echo $RET