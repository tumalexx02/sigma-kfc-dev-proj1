#!/bin/bash

docker build -t backend:latest ./backend

docker build -t frontend:latest ./frontend

docker compose up -d