#!/bin/sh

echo starting node.js container

cd /app

echo "run server.js ..."
npm i
pm2 start server.js
pm2 flush
pm2 logs
