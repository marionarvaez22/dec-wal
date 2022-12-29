FROM node

RUN mkdir -p /var/www/the-december-wall

WORKDIR /var/www/the-december-wall

COPY package.json ./

RUN npm install

RUN npm install -g nodemon 

COPY . .

EXPOSE 8000