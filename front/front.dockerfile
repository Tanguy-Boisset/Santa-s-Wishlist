# pull official base image
FROM node:13.12.0-alpine

# Create an application directory
RUN mkdir -p /app

# set working directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY front/package*.json ./

# Install node packages
RUN npm install

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY front/ .

# Build the app
RUN npm run build


# Start the app
CMD [ "npm", "start" ]
