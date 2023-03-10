# OpenAI Template
This project is a starter kit for using OpenAI and its API layer. It is baked in with Authentication, Session Management, Token Tracking, as well as Billing (currently disabled).

## Introduction

To start using the project, you will need the following. Node version 14 or above, MongoDB Cloud, an OpenAI account and key and Python.

### Current Configuration
These are quite important as they can effect the installation and dependencies of the project. Please use the following:

- Node Version 14.17.6
- NPM Version 6.14.15
- Python Version 2.7

### Starting Guide

Prepare the following items

- OpenAI account + API Key
- MongoDB Cloud instance database (free tier) + Cluster/Login
- NodeJS
- StripeJS (not required unless implementing billing)

### Installation

- Perform a NPM install or Yarn in the rood directory to install modules
- Update the ENV keys (or ENV.DEV) for your environemnt (for OpenAI, Mongo Etc)
- - MongoDB requires Cluster, Database, Username and Password
- For PC `npm run api` to start the instance of the project
- For Mac `npm run apimac` to start the instance of the project
- Start the Create React App using `npm start`

On first run, the database will initialise with an admin user at `/routes/middleware/mongo.js` which can be updated

You will be able to login with the following details:
Username: admin@domain.com
Password: KeepingHumanSafe101

Adding users can be done through the signup form or directly on Mongo (database)

You should have an instance of the backend and frontend running.

For more information, please follow the video attached to this project. This is a starter template. Support is not included as part of the download. Debugging and such will need to be performed at on your own, as well as implementing features.

There is the option to add Stripe, which is currently configured for subscriptions, you will need to connect the Stripe API, Webook URL, and create pricing plans (tempalates provided).

## Adding Prompts

The following steps need to be completed to add one new prompt on the backend and frontend.

### Part 1: Frontend
Head to `./src/tools/` to add the option to use a prompt on the frontend:

- Copy an existing prompt structure, and relabel the title, description, examples (eg, summarize.js -> helloworld.js)
- Update the intended backend url call path on the prompt to `/helloworld`
- Then import the new file add and it to the array on index.js

### Part 2: Backend
Head to `/routes/ai/` to add to the backend a new file

- Copy an existing file prompt call such as (eg. summarize.js -> hellowworld.js)
- Update the listen POST path to `/helloworld`
- Import the new file and add it to the array on index.js

Restart the client and backend server. The new prompt should show up. I've added an example hello world for testing purposes.

### Part 3: Customise Promtps
Udpate the backend and frontend queries to define the kind of prompt you want to query OpenAI with, as well as the kind of output you wish. There are examples for plaintext and listed prompts as part of this process.

## Publishing the Project

If you want to go live and publish the project, you will need a live domain and hosting. You can run NPM run build, and this will build the create react app the the build folder, which the web server will use as reference for the project online.

## Going Live (VPS or Live Server)

1. Update `.env` and `src/config.js` file with the URL/domain
(this will prep the frontend react and backend with the URL's you wish to use)
2. Run `npm run build` to build the react project
(this will allow the backend server to serve the create react project on the build folder that is compiled)
3. Run the project on your server `node ./index.js` or with a tool like pm2 or forever to ensure it is always up
4. Create a proxy to port forward it, or access it directly. Ideally install something like letsencrypt to allow for SSL certificates.

# Bugs and Fixes

I've released videos to cover some of the bugs and fixes. If you are running newer versions of node or python, please read below:

- Use the --legacy-peer-deps flag when installing dependencies. This flag will allow npm to install the packages even if their peer dependencies are not satisfied. Note that using this flag may result in a broken or unstable project, so it should be used with caution.

- Use the --force flag when installing dependencies. This flag will allow npm to install the packages even if there are conflicts or errors. This should be used as a last resort, as it can result in a broken or unstable project.

- Some instances people mention nodemon not working. You can also install it gobally. You can run npm install nodemon -g to do this.

- I recommend using the node and npm versions I listed ealier, as these provide for the best installation environment.