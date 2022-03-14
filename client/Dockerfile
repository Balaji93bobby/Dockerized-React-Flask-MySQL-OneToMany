FROM node:latest as builder
RUN mkdir /frontend
WORKDIR /frontend

# Install the application's dependencies into the node_modules's cache directory.
COPY package.json ./
# COPY package-lock.json ./
RUN npm install
COPY ./ ./

# CMD ["npm", "run", "start"]

RUN ["npm", "run", "build"]

# nginx needed for deployment as production server
FROM nginx:stable-alpine
# For AWS Elastic Beanstalk for port mapping incoming traffic - 3000 so it hits React port first
# EXPOSE 3000

# New default.conf file is changing the default port(80) that nginx listens on to 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Copying build from above into html folder
COPY --from=0 /frontend/build /usr/share/nginx/html