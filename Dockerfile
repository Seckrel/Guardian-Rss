# Base image
FROM node:18-alpine

# RUN npm install -g yarn

# RUN npm install -g tsc
# RUN npm install -g nodemon
RUN mkdir -p /code

# Set the working directory
WORKDIR /app

RUN apk update && apk add bash

# Copy package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./app/

# Install dependencies
RUN yarn install

# Copy the source code to the working directory
#COPY . .

# RUN chmod +x entrypoint.sh
EXPOSE 8080
# CMD [ "node", "src/index.ts" ]
# ENTRYPOINT ["/app/entrypoint.sh"]
# ENTRYPOINT /bin/sh