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


## API 
```
/api

├── /auth
│   └── POST
│   |   └── /token
│   └── PUT
│       └── /token
|
├── /user
│   └── GET /
│   |   └── /:id
│   └── POST
│       └── /:id
|
├── /appointment
│   └── GET
│       ├── /
│   └── POST
│       ├── /
|
├── /appointment/:Appointment_id
│   └── GET
│   |   ├── /
│
├── /walker
│   └── GET
│       └── /:walker_id
│ 
├── /services
│   └── GET
│       ├── /
```
