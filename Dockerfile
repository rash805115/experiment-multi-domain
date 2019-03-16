FROM nginx:alpine-perl

RUN apk update && \
    apk add nodejs --no-cache && \
    apk add npm --no-cache && \
    rm -rf /var/cache/apk/* && \
    mkdir -p /server

WORKDIR /server

COPY package.json /server
RUN npm install --only=production

COPY ./ /server/
COPY profiles/configurations/development.js /server/src/configurations/development.js

COPY profiles/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
ENTRYPOINT ["npm", "start"]
