FROM node:lts-alpine
WORKDIR /build_

COPY package*.json /build_
COPY apps/backend /build_/apps/backend
COPY packages /build_/packages

RUN npm ci

WORKDIR /build_/apps/backend

CMD ["npm", "run", "dev"]
