FROM node:24-bookworm

# Install TypeScript and Node types globally
RUN npm install -g typescript@latest @types/node@latest

WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install

CMD ["npm", "start"]