FROM "node"

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

VOLUME [ "/usr/src/app/log" ]

EXPOSE 9000

CMD [ "node", "server.js" ]