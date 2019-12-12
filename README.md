# docker-collection
My collection of dockerfile scripts

## FFMPEG
Basement:
* jrottenberg/ffmpeg:3.4-alpine (main)
* python:3.7 (API-submodule)

Image with installed ffmpeg and python web api service which controls ffmpeg processes (starting, killing, status). 
Using this image makes sense, if you want to control ffmpeg from outside, for instance, 
from external service, where it isn't possible (or needlessly) to use ffmpeg (another docker container).

Rest API comes with routes:

- ###### Proceed video and create thumbnails every second
```bash
curl -d "video=PATH_TO_VIDEO" -X POST http://localhost:4000/ff-thumbs
```
Response:
```json
{"status": "ok", "duration": 0, "check": true, "thumbs": "PATH_TO_THUMBS"}
```

 * "status" - returns "ok", if method has succeeded and "err" if there is an exception
 * "message" - returns only if exception was occurs. This field will contain main exception cause
 * "duration" - rounded duration of the requested video in seconds
 * "check" - ffmpeg launch status. Returns "true" if ffmpeg is launched, and vice versa with "false"
 * "thumbs" - a path to the folder with thumbnails. Python will create a new one with hash as the name
 
 
 - ###### Get ffmpeg launch status
```bash
curl http://localhost:4000/ff-check
```
Response:
```json
{"status": "ok", "duration": 0, "check": true, "thumbs": "PATH_TO_THUMBS"}
```

 * "status" - returns "ok", if method has succeeded and "err" if there is an exception
 * "output" - returns stdout from executed command
 * "check" - ffmpeg launch status. Returns "true" if ffmpeg is launched, and vice versa with "false"
 
 
## Node.js (external websocket module)
Basement: 
* node:10.17.0

This is quite a simple image with node.js application which might be useful for building an external websocket system.
Application has also a simple REST API service based on Express.js framework to receive any external API requests. 
For opposite goal, there is an axios library to make async calls to another external REST services. 
Application can read .env variables, so it's possible to pass, for instance, any necessary data like host names, authorisation values and so on.

In current version, application has few examples, how to work with websockets and with REST service. 

Future changes:
```text
- rest services are in update state, will come in later commits
- update all dependencies to latest version
```