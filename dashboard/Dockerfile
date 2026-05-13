FROM node:20-alpine
WORKDIR /app
RUN npm install supertokens-node express
COPY server.js .
EXPOSE 3000
CMD ["node", "server.js"]
