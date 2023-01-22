# Freelance Platform App

### To run the app locally:

1. Make sure you have an LTS version of Node.js installed on your computer.
   [Download and install](https://nodejs.org/en/) if it necessary.
2. Clone this repo.
3. Install the basic project dependencies with the command `npm install`.
4. Create .env.local file @ apps/freelance (near env.example file). Should include variables from example file with correct values
5. Start development mode by running the command `npm start`.
6. Navigate to the address in your browser
   [http://localhost:4200](http://localhost:4200). This page will automatically
   reload after saving changes to project files.

#### Deploy instructions

From main default branch:

```bash
$ git pull
$ npm run build
$ npm sync (update remote s3 bucket)
```

(in order for sync script to work user needs to get access to remote website, once, then it will always work)

How to get access to remote website (all values are example, use real keys)

- download/install Amazon CLI: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
  In AWS console enter:
- aws configure
  will ask AWS Access Key ID
- AKIA5PKNUNEJLEXAMPLE
  will ask AWS Secret Access Key
- KG1S/heAu1tQ6hcv76EfwBGLh8/5F/EXAMPLE
  will ask default region
- eu-central-1 (enter correct AWS region)
  will ask default output format (just skip, default is ok)

#### Frontend repo

`<link>`: https://github.com/ZenBit-Tech/coffee_lovers_frontend

[ Nx, React, Typescript, Redux, ReduxJs/toolkit, Styled Components,
react-router-dom ]

#### Backend repo

`<link>`: <https://github.com/ZenBit-Tech/coffee_lovers_backend>

[ NestJs, Typescript, Typeorm, MySql ]

## Installation

Freelance Platform App requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/ZenBit-Tech/coffee_lovers_frontend
cd coffee_lovers_frontend
npm i
npm start
```
