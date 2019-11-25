FROM jrottenberg/ffmpeg:3.4-alpine
FROM python:3.7

RUN echo starting building ffmpeg container

COPY --from=0 / /

RUN mkdir /app
RUN mkdir /app/logs
COPY ./app-run.sh /app
COPY ./app.py /app
RUN chmod +x /app/app-run.sh
RUN chmod +x /app/app.py

RUN pip install flask
RUN pip install gunicorn
RUN pip install psycopg2-binary

WORKDIR /app

ENTRYPOINT ["./app-run.sh"]
EXPOSE 4000
