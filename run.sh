#!/bin/bash

# storing current working directory in a variable
current=$(pwd)

# running docker desktop first 
cd /
./"$(C:/Program\ Files/Docker/Docker/Docker\ Desktop.exe)"

# chango to current directory for further operations
cd /
cd ./"${current}"

# sleep for 2 sec to let the docker desktop open fully
sleep 2

#  if the build is passed then re build the project otherwise run the app as it is.
if [ "$1" == "build" ]
then
   echo "Building you app"
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
else
   echo "Starting"
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
fi

# start localhost:3000 and localhost:8000
start http://localhost:3000/
start http://localhost:8000/