FROM node:10.17.0

RUN mkdir /app

COPY ./app-run.sh /app/
RUN chmod +x /app/app-run.sh
WORKDIR /app

RUN npm install pm2 -g

EXPOSE 3000
ENTRYPOINT ["./app-run.sh"]