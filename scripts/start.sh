#!/bin/bash

docker-compose up --build -d frontendprod

docker-compose up --build -d backendprod

docker-compose up --no-build -d nginx