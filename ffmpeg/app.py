from flask import Flask, request
from flask import Response
from werkzeug.contrib.fixers import ProxyFix
from flask import request
import sys
import os
import uuid
import base64
import json
import time
import subprocess
from subprocess import check_output, CalledProcessError, STDOUT
import shlex
import re
from array import *
from shutil import copyfile
import uuid

app = Flask(__name__)

def runC(command, isGrep=False, grepText='', isFloat=False):
    command = shlex.split(command)
    if isGrep:
        try:
            ps = subprocess.Popen(command, stdout=subprocess.PIPE)
            output = check_output(['grep','-i', grepText], stdin=ps.stdout, stderr=STDOUT).decode()
        except:
            output = ''
    else:
        try:
            output = float(check_output(command).decode()) if isFloat else subprocess.Popen(command)
        except CalledProcessError as e:
            output = ''
    return output

def checkFfmpeg(output=''):
    check = re.findall(r'ffmpeg -i', output, flags=re.IGNORECASE)
    return len(check) > 0

@app.route('/ff-thumbs', methods=['POST'])
def start():
    if 'video' not in request.form or request.form.get('video') == '':
        return Response(json.dumps({"status": "err", "message": "missing require body elements"}), mimetype='application/json;charset=UTF-8')

    try:
        a = runC('ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 {0}'.format(request.form.get('video')), None, None, True)
        a = round(a)
        thumbsFolder = uuid.uuid4().hex
        os.system("mkdir /mnt/media/" + thumbsFolder)
        runC('ffmpeg -i {0}  -vf fps=1  -f image2 -y "/mnt/media/{1}/%d.jpg"'.format(request.form.get('video'), thumbsFolder))
    except:
        return Response(json.dumps({"status": "err", "message": "bad video"}), mimetype='application/json;charset=UTF-8')
    b = runC('ps aux', True, 'ffmpeg')
    return Response(json.dumps({"status": "ok", "duration": a, "check": checkFfmpeg(b), "thumbs": '/mnt/media/'+thumbsFolder}), mimetype='application/json;charset=UTF-8')

@app.route('/ff-check')
def check():
    a = runC('ps aux', True, 'ffmpeg')
    return Response(json.dumps({"status": "ok", "output": a, "check": checkFfmpeg(a)}), mimetype='application/json;charset=UTF-8')

@app.route('/')
def hello_world():
    return 'FFMPEG API IS THERE!'

app.wsgi_app = ProxyFix(app.wsgi_app)
if __name__ == '__main__':
    app.run()