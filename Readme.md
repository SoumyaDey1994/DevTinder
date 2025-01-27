## DevTinder Node/Express App

### REST API Server Setup
    - Create a repository
    - Initialise the repository
    - package.json, package-lock.json & node_modules directory
    - Install express
    - Create a server
    - Listen to port 7777
    - What are package dependencies
    - Difference b/w caret(^) & tide(~) symbol in package version
    - Meaning of -g option during npm install
    - Write express route for /, /hello & /test
    - Install nodemon & update changes in runtime
    - Add command scripts in package.json for dev & start

### Initialize Git Repository
    - Initialize git
    - Add .gitignore file & put node_modules/ to it
    - Add remote repo URL
    - Push changes to git remote
    - Use Postman
    - Create GET & POST API for /users route
    - Req path wilcard charts (*, +, ?, () & regex)
    - Query Params: req.query & Dynamic Routes: req.params
    - app.use(...) vs app.get(), app.post(), etc

### Route Handlers
    - Chain of route handler
    - (req, res, next) arguments of route handler
    - request timeout when response is not sent
    - Error when execute route handler after sending response once
    - Error when calling next() post sending response
    - 404 error if next() is called from last route handler
    - app crash if called next() just before sending response in same handler
    - What is middleware & why to use it ?
    - Use chain of middlewares to perform taks 1 after another in sequence
    - Common error handler route

### Database Connection & Schema
    - Install Mongoose
    - Create MongoDB cluster, create database & collection (Mongo Atlas)
    - Connect to database using mongoose.connect
    - Start server once connection to DB is successful
    - Create a user schema
    - Create a User model from schema
    - Write /signup API controller
    - Save static user document to DB
    - Handle error scenario with try-catch
    -