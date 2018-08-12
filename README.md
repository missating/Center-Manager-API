[![Build Status](https://travis-ci.org/missating/Center-Manager-API.svg?branch=develop)](https://travis-ci.org/missating/Center-Manager-API)
[![Coverage Status](https://coveralls.io/repos/github/missating/Event-Manager/badge.svg?branch=develop)](https://coveralls.io/github/missating/Event-Manager?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/77b397af25b864e5b093/maintainability)](https://codeclimate.com/github/missating/Event-Manager/maintainability)

# Center-Manager

A center management tool for your events

## Description

The center-manager-api is the backbone of any application that can be used to manage events by anyone. The project enables users to manage events they create, invite people and also register to attend events created by other people. User can create events based on the event date and availablity of their preferred center on that particular date.

## Technologies 

1. [Nodejs](https://nodejs.org/en/)
1. [Postgresql](https://www.postgresql.org/)
1. [Express](https://expressjs.com/)
1. [Sequelize](http://docs.sequelizejs.com/)
1. [Mocha](https://mochajs.org/)
1. [Chai](http://www.chaijs.com/)

## Installation

1. Install `Node.js`
2. Then clone the repo by running `git clone https://github.com/missating/Center-Manager-API.git`
3. `cd` into root of the project directory
4. Run `npm install` on the terminal to get all needed dependencies (Note: npm already comes installed with node.js)
5. Create a `.env` file in the root directory of the appllcation. An example of the content in the `.env` file can be found here `.env.example`
6. Once the set up is complete, to start the application run `npm run start:dev`

## Testing

Unit tests - Run `npm run test:server` on the terminal while within the project root directory. Unit testing is achieved through the use of Mocha (A JS test framework 
that runs both on Node.js and in the browser) and Chai (A BDD/TDD assertion library for node and the browser).
