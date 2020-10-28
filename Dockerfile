FROM node:latest

COPY .env .env

RUN apt update
RUN apt install git ffmpeg -y
RUN git clone https://github.com/patrickgoeler/floetenbot
WORKDIR floetenbot/
RUN cp /.env .env
RUN npm i && npm run build

ENTRYPOINT ["node","dist/index.js"]
