FROM node:alpine

LABEL version="1.0" description="Encurtador de URL"
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "start"]