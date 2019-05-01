FROM node:latest

WORKDIR /api

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start"]
#CMD [ "node", "app.js" ]
