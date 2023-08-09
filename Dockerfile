FROM node:18.17.0-alpine
WORKDIR /app
COPY . .
RUN npm i
EXPOSE ${PORT}