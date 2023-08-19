#!/bin/bash

/docker-entrypoint-initdb.d/setup-ddls.sh & /opt/mssql/bin/sqlservr