FROM node:current-slim

WORKDIR /products-api

COPY package.json .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]

