#!/bin/bash

docker compose down

docker build -t backend:latest ./backend

docker build -t frontend:latest ./frontend

docker compose up