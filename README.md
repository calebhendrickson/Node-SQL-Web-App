Exercise to write fullstack app with SQL server & Node.js. Also an exercise in writing modular code and laying out an extensible layered architecture, as well as an exercise practicing informative development error handling.

Created with:
  Jade view engine, Node.js, Express.js, and SQL Server
  Layered Architecture
    Features by Layer
      Presentation Layer - Jade template files (views folder)
      Business Layer - Contains server-side routing, API endpoints, & business logic (express session used to verify post-er identity (routes folder)
      Persistence Layer - Contains methods to persist/query to the database (services folder)
      Database - SQL Server (mssql/msnodesqlv8 module, Users table with Username primary key and Posts table with Username foreign key)
  
  Clients hits "/" endpoint and is prompted to log in. To do this Client must visit /signup and create an entry in users table, 
  on success they will be redirected to "/login" route where they can login and a session will be created for that user. From 
  there they will be redirected to the "/" route to view posts that have been created by users. Clients can visit "/posts" to 
  create a post and view their post among all other posts.
  
  To run application, clone repository and cd into NodeJsExample folder, run npm install, and run npm start.
  
