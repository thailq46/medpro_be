FROM node:20-alpine

WORKDIR /medpro/backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]

# docker build --tag medpro_be .
# docker run -p 4004:4004 -d medpro_be