FROM node:8-alpine AS base

# 사용자 및 작업위치 설정
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# dependencies
COPY package.json .
RUN npm install

# copy app source
COPY . .

# build
RUN npm run build


FROM node:8-alpine AS production-ready

# remove dev-dependencies
COPY --from=base /usr/src/app /usr/src/app
WORKDIR /usr/src/app
RUN npm prune --production


FROM node:8-alpine AS production

ENV NODE_ENV=production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=production-ready /usr/src/app/node_modules ./node_modules
COPY --from=production-ready /usr/src/app/dist ./dist
COPY --from=production-ready /usr/src/app/package.json .

USER node
CMD ["npm", "start"]
