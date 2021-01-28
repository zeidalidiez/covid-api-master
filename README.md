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
   
### FrontEnd

   * JavaScript
   * React
   * React-Router
---------------------------------------------------------------------------------

## Routes

### '/' the Landing page route

This is the first page users will land on. Where they can see a demo of our site, sign up, and log in

### '/login' login page route && '/signup' sign up page route

This is where users can sign up or login in order to get an authenticated JWT to access the entire website, if they try access another route without an authenticated JWT they would be redirected to login page

### '/dashboard' the dashboard route is private route for signed up users
This is where users are directed after sign up and login. Users now have full access to finding dogwalkers, available times, and make an appointment.
