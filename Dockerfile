FROM node:current-slim

WORKDIR /products-api

COPY package.json .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

