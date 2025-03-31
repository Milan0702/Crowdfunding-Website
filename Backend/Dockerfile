FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# First, copy only package files to leverage Docker cache
COPY Backend/package*.json ./

# Install dependencies with specific npm flags for better reliability
RUN npm install --production --no-optional --no-audit

# Now copy the rest of the backend application
COPY Backend/ ./

# Expose the port your app runs on
EXPOSE 4000

# Command to run the application
CMD ["npm", "start"] 