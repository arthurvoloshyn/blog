FROM node:8

# Application folder
ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# Installing dependencies in production
COPY package*.json ./
RUN npm install --production

# Copying project files
COPY . .

# Notification of the port that a running application will listen on
EXPOSE 8000

# Project launch
CMD ["npm", "start"]
