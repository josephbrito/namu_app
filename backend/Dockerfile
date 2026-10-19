FROM node

WORKDIR /app/backend

COPY package*.json .

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]