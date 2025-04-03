# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --only=production
# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Define the command to start the application
CMD ["sh", "-c", "npm run dev"]
