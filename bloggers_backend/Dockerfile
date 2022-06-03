FROM node:alpine3.15

WORKDIR /app

COPY . /app

EXPOSE 4000

RUN apk add --no-cache make gcc g++ python3 && npm install

CMD ["npm", "start"]