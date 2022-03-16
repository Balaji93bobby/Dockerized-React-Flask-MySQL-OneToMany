FROM node:latest as builder
RUN mkdir /frontend
WORKDIR /frontend

COPY package.json ./

RUN npm install
COPY ./ ./

# CMD ["npm", "run", "start"]

RUN ["npm", "run", "build"]


FROM nginx:stable-alpine



COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=0 /frontend/build /usr/share/nginx/html
