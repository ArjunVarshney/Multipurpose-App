#!/bin/bash
current=$(pwd)
cd C:
./"Program Files\Docker\Docker\Docker Desktop.exe"

cd E:
cd ../"${current}"

sleep 2

if [ "$1" == "build" ]
then
   echo "Building you app"
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
else
   echo "Starting"
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
fi