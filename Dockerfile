FROM node:18.16.0

WORKDIR /usr/app

COPY . .

RUN apt-get update && apt install bash && npm install

CMD [ "npm", "run", "dev" ]