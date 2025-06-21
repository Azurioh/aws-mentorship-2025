FROM node:lts-alpine

WORKDIR /build_

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"] 