FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN apk add --no-cache --virtual .gyp \
        python3 \
        py3-pip \
        make \
        g++ \
    && npm install \
    && apk del .gyp

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
