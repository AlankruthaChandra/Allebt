FROM node:carbon-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build
FROM node:carbon-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build /app/build
EXPOSE 8080
ENTRYPOINT serve -l 8080 -s build