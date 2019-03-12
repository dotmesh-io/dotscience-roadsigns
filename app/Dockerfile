FROM mhart/alpine-node:8

WORKDIR /app

# install api node_modules
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
RUN yarn install

# copy files
COPY . /app

ENTRYPOINT ["node", "index.js"]