FROM node:14-alpine3.12
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:14-alpine3.12
WORKDIR /app
COPY --from=0 /app ./
RUN apk add bash
ENTRYPOINT ["sh", "-c"]
EXPOSE 5000
CMD ["node -r ./tsconfig-paths-bootstrap.js dist/src/main.js"]