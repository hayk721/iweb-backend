FROM node:14.18-alpine As development

WORKDIR /iweb-backend

COPY package*.json ./

RUN npm i -g rimraf
RUN npm i -g @nestjs/cli
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:14.18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /iweb-backend

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /iweb-backend/dist ./dist

CMD ["node", "dist/main"]