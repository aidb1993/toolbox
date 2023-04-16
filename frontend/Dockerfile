# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 5173

# Start the application
CMD [ "npm", "run" , "dev" ]




