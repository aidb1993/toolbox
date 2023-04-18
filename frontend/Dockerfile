# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Start the application
CMD [ "npm", "run" , "dev" ]

EXPOSE 3001




