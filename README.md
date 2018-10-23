# Digital Museum

Digital Museum is a PWA designed web s that will present real world features through the physical web.

It's goal is to provide a new interface for the *[Museu da Fauna e
Flora do ICMC-USP][MFF-ICMC]* 

This version is a fork and extension from the original project [Digital Museum][digital-museum]

---

## Setup
 1. Clone the repository:

        git clone git-url
 2. Download the required modules to the project by running npm in the project folder:

        npm install

## Set server port
The default server port can be changed in the index.js file in the server folder. The port can be also specified in the environment.

## Environment
To this moment, only two environment variables are used: NODE_ENV and PORT. PORT is used to define running port of the server, and the NODE_ENV, if set to production, defines the build configuration.

## Launch
- In the project folder, launch the command:

        npm start 

- The environment variables (on Linux based OS) can be set as follow:

        ENV_VAR_NAME=VAR_VALUE

- To make the variables persistent:

        export ENV_VAR_NAME=VAR_VALUE

- Obs: the command `printenv ` can be used to check the defined environment variables and it's values. Additionally ` printenv ENV_VAR_NAME` can be used to get the value of the variable specified.

## Folder Structure
```
.
├── buildScripts : the scripts to build the app
├── node_modules : store the dependencies
├── output : store the builds 
├── res : icons used
├── server : server configuration
└── src : the app code
```

## Built With

* [React](https://reactjs.org/) - The UI library used
* [npm](https://www.npmjs.com/) - Dependency Management
* [Node.js](https://nodejs.org/) - Runtime Environment

## Authors


[MFF-ICMC]: https://www.icmc.usp.br/cultura-e-extensao/museu-da-fauna-e-flora "Museu da Fauna e Flora do ICMC"
[digital-museum]: https://github.com/hick209/digital-museum "digital-museum"