# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install Ionic CLI globally
RUN npm install -g @ionic/cli ngx-logger

# Copy package.json and package-lock.json files for dependency installation
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Ionic uses for development
EXPOSE 8100

# Set the default command to run when the container starts (serve the app)
CMD ["ionic", "serve", "--host", "0.0.0.0", "--port", "8100", "--ssl"]
