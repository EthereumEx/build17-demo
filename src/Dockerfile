FROM node:7.10.0

LABEL maintainer "Ali Hajimirza ali@alihm.net"

RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web
COPY package.json .

RUN ["npm", "install"]

COPY truffle ./truffle
RUN ["npm", "run", "compile"]
RUN ["npm", "run", "migrate"]

COPY app ./app

ENTRYPOINT ["npm", "start"]
