FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
RUN mkdir /usr/app
WORKDIR /usr/app

# copy both 'package.json' and 'package-lock.json' (if available)
#COPY package*.json ./

# install project dependencies
#RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
# COPY . .

# build app for production with minification
#RUN npm run build

EXPOSE 8080

RUN echo "npm run install" > /usr/bin/build
RUN echo "npm run build" >> /usr/bin/build
RUN echo "http-server dist" > /usr/bin/run

RUN chmod +x /usr/bin/build
RUN chmod +x /usr/bin/run
#CMD [ "http-server", "dist" ]
