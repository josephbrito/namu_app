FROM node

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

EXPOSE 8081

CMD ["npx", "react-native", "start", "--host", "0.0.0.0", "--port", "8082"]
