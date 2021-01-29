# Zeid Dog Walker Capstone

---------------------------------------------------------------------------------

 Live Demo: https://covid-frontend-master.zeidalidiez.vercel.app/
 
 Client Repo: https://github.com/zeidalidiez/covid-frontend-master
 
 Server Repo: https://github.com/zeidalidiez/covid-api-master
 
---------------------------------------------------------------------------------
## About:

We are a service to help people walk their dogs during these uneasy times of COVID.  Once logged in you'll be able to select from one of our walkers!  Just select the name of the walker, pick your Service and Time, then check your profile.  Your appointment will be updated! So Login or Sign up and we will take care of all of your dogwalks!!

---------------------------------------------------------------------------------

## Technologies Used

### Backend

   * Postgres
   * NodeJs
   * Express
   * Knex
   * Postgrator
   * JWT
   * bcryptjs
   * morgan
   
### FrontEnd

   * JavaScript
   * React
   * React-Router
   * jwt-decode
---------------------------------------------------------------------------------

## Routes

app.use('/covidapi/auth',authRouter);
app.use('/covidapi/walker',walkerRouter);
app.use('/covidapi/services',serviceRouter);
app.use('/covidapi/appointment',appointmentRouter);




### '/covidapi/' the Landing page route

This is the 'root' endpoint and does not post, fetch, nor delete any data.


### '/covidapi/user' user route 

Allows one to post a new user with the required body data.

### '/covidapi/auth/token' provides authentication tokens via post

###  '/covidapi/walker' provides get information from dog walker database

### '/covidapi/services' provides get information from services database

### '/covidapi/appointment' provides information regarding to appointments

* Also provides :/appointment_id route to set and get appointment information from database