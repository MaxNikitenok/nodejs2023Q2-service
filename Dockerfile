FROM node:18.17.0-alpine
WORKDIR /app
COPY . .
RUN npm i
CMD [ "npm", "run", "start:dev" ]
EXPOSE 4000/tcp