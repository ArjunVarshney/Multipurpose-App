#using node alpine image from the docker hub
FROM node:14-alpine

#setting the work directory to /app
WORKDIR /app

# Copy the package.json file for optimizing the build process and install the packages
COPY ./package.json .
RUN npm install

# copy all the file related to app in the workdir
COPY . .

# expose the port 3000 to the outside world
EXPOSE 3001

CMD [ "npm", "start" ]