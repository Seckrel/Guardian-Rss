# Base image
FROM node:18

# RUN npm install -g yarn

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the source code to the working directory
COPY . .

# Start the Node.js application
# CMD [ "yarn", "dev" ]