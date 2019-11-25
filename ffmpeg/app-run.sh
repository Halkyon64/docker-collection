#!/bin/sh

echo starting ffmpeg container

gunicorn -b :4000 app:app --access-logfile logs/access.log --error-logfile logs/error.log --reload
