FROM node:latest

WORKDIR /app

RUN apt-get update

COPY . .

RUN rm .env && rm -r node_modules && rm .gitignore && rm package-lock.json

RUN npm install

EXPOSE 80

CMD ["node","./src/index.js"]