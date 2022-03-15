FROM node:latest as builder
RUN mkdir /frontend
WORKDIR /frontend

# Install the application's dependencies into the node_modules's cache directory.
COPY package.json ./

RUN npm install
COPY ./ ./

# CMD ["npm", "run", "start"]

RUN ["npm", "run", "build"]

# nginx needed for deployment as production server
FROM nginx:stable-alpine



COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=0 /frontend/build /usr/share/nginx/html