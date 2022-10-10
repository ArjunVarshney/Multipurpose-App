# selection node alpine version from docker hub
FROM node:14-alpine

# set the work directory in the container
WORKDIR /app

# copy package.json in the file and run npm install
COPY ./package.json .
RUN npm install

# copy all other files from the system to the container 
COPY . .

# Expose Port $PORT from the container to access the backend
EXPOSE $PORT

# Run index.js file in the container
CMD [ "node", "index.js" ]