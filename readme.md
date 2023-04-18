# Toolbox Challenge

This project consists of a frontend and a backend folder. The frontend folder contains the user interface of the application, while the backend folder contains the server-side code.

## Getting Started

To get started, clone this repository to your local machine and navigate to the root folder of the project.

### Prerequisites

Before running the project, you will need to have Node.js and npm installed on your system.

### Installing

To install the project dependencies, run the following command in both the frontend and backend folders:

`npm install`

### Running the Project

### Running with Docker Compose

To run the project with Docker Compose, make sure you have Docker and Docker Compose installed on your system, then navigate to the root folder of the project and run the following command:

`docker-compose up`

This command will build and start the containers for the frontend and backend, and expose the application on port 3001.

### Running without Docker Compose

If you prefer to run the project without Docker Compose, you can start the backend and frontend servers separately.

#### Backend

To start the backend server, navigate to the backend folder and run the following command:

`npm run start`

To run the tests, run the following command:

`npm run test`

To run the Standard Lint, run the following command:

`npm run lint`

#### Frontend

To start the frontend server, navigate to the frontend folder and run the following command:

`npm run dev`

To run the tests, run the following command:

`npm run test`

## Built With

- [Node.js](https://nodejs.org/) - The JavaScript runtime used
- [npm](https://www.npmjs.com/) - The package manager used
- [React](https://reactjs.org/) - The frontend framework used
- [Express](https://expressjs.com/) - The backend framework used

## Authors

- [Agustin Diaz Bellone](https://github.com/aidb1993)
