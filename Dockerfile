# Use an official node runtime as a parent image
FROM node:latest

ENV http_proxy http://proxy-tech.svc.ext.tdc:3128
ENV https_proxy http://proxy-tech.svc.ext.tdc:3128

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /
ADD . /

# Install any needed packages
RUN cd /app && yarn

# Make port available to the world outside this container
EXPOSE 8080

# Run start when the container launches
CMD ["npm", "start"]
