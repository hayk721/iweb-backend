FROM node:14.17-buster-slim As development

WORKDIR /iweb-backend

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:14.17-buster-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /udh_epayments

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /iweb-backend/dist ./dist

CMD ["node", "dist/main"]