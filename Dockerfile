FROM node:latest as build
COPY ./ /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist/matt-bauer-capstone-editor-fe/ /usr/share/nginx/html
