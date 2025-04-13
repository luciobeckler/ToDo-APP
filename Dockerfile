FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

EXPOSE 4200

CMD ["npm", "run", "start"]
