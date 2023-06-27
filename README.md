# Jabook
A fully JavaScript notebook web application built mainly with react and typescript 

### first start by install the dependencies
```
npm run install
```

### 1. to run in development mode
```
npm run start
```
> this will internally run the command **lerna run start --parallel**
> which will run all packages in parallel

### then go to **http://localhost:3000/** to see the changes 

### 2. to test for production

1. go to **packages/cli**
2. on the command line run the command
```
node dist/index.js serve [optionns] [filename]
```
> [options]: specify port to run the server ***--p or --port*** default to ***4005***
>
> {filename]: specify the name of file to save your progress
> 
#### note: this will create the file with [filename] in the current directory of the command line 

3. go to **http://localhost:[port]/**

### 3. to publish the application run
```
lerna publish --no-push
```
