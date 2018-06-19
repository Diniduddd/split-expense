#expense splitter

**Table of Contents** 

- [Documentation](#documentation)
  - [Requirements](#requirements)
  - [Deployment](#installation)
    - [- Dev Deployment](#--dependency)
    - [- Production Deployment](#--configuration)
  - [Run the Application](#installation)
  - [Algorithm](#installation)
  - [validation]()
  - [Unit Test](#installation)
  - [Code Quality](#installation)
  - [Application Logs]()

# Documentation
This is the documentation section for complete setup and start the application.

## Requirements
The application developed with
- node version 8.11.0
- npm version 5.6.0

So for run the application the deployment environment must them pre installed.

## Deployment
### - Dev Deployment
1. Install dependencies

    ```sh 
    npm i
    ```

2. Run the application
     ```sh
       npm start
     ```

### - Production Deployment
1. Install dependencies

    ```sh 
    npm i
    ```

2. Build the application
     ```sh
       npm run build
     ```
3. Run the application
    ```sh
        npm start:prod
    ```     
    After building the application build result files can be found in `dist/` directory.
    These build are compatible with old node versions.
    
    *Since it is a console application and it used files in host computer the application is not dockerized*.

## Run the Application

For run the application the user has to give two inputs.
1. A file which contains the **names of users**
2. A file which contains the **Expense transactions of users**

There are two methods to do this.

1. When running the application(with `npm start` or `npm start:prod` commands) the user
 first has to answer two questions which ask the file path for those files.
 
2. Before run the application the user can copy-past those data files to **inputData** directory
 and the name of the files has to be  **"names.txt"** and **"expenseTransactions.txt"**. This is the default file path
 the program is going to look. So when running the program and when it ask for file paths just press enter.
 
## Algorithm
The the complexity of expense split is similar to well know [bin packing problem](https://en.wikipedia.org/wiki/Bin_packing_problem).

So for solve the issue **best fit Algorithm** is used. With this, the application settle the expenses with least amount of transactions.

## validation
The application validate user inputs
- Input file paths (to make sure it is a valid file path)
- Contends of the file (to make sure they are provided with correct format)
- Transaction list and the user name list (to make sure all the transactions are done by given user set)

When a validation error is captured the application is going to log a error message and exit the programme.

## Unit Test
For write unit tests Jest library is used. 

The application has full unit test coverage. For run the unit test

```sh
    npm run test
```

In adition to show results in console unit test coverage report is also going to generate coverage report  and it can be found in **./coverage** 
. The HTML version of the report can be opened with **./coverage/lcov-report/index.html**.

## Code Quality
For check code quality ESLint with is used. For run code quality test against code base

```sh
    npm run lint
``` 

## Application Logs
The application has two run time environments
- develop
- production

When the application runs in develop environments it logs till trace level (all trace, debug, info, warn, error, fatal).
`npm start` run the application in develop mode.

When the application runs in production environments it logs till warn level (only warn, error, fatal).
` npm start:prod` run the application in production mode.

