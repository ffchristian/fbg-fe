FROM node:alpine

WORKDIR /app

ADD . .

RUN npm cache clear -f
RUN npm i

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
