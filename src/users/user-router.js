'use strict';
const express = require('express');
const path = require('path');
const UsersService = require('./user-service');

const usersRouter = express.Router();
const jsonBodyParser = express.json();


usersRouter 
  .post('/', jsonBodyParser, (req,res,next)=>{
    const {user_name,first_name,last_name,email,phone_number,password} = req.body;
    for (const field of ['user_name', 'first_name', 'last_name', 'email', 'phone_number', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });
    const passwordError = UsersService.validatePassword(password);

    if (passwordError)
      return res.status(400).json({ error: passwordError });
    UsersService.hasUserWithUserName(
      req.app.get('db'),
      user_name
    )
      .then(hasUserWithUserName => {
        if(hasUserWithUserName){
          return res.status(400).json({error:'Username already exsits'});
        }
        return UsersService.hashPassword(password)
          .then(hashedPassword => {

            const newUser = {
              first_name, 
              last_name,
              user_name, 
              password:hashedPassword,
              email,
              phone_number,
              date_created: 'now()'
            };
            
            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user));
              });
          });   
      })
      .catch(next);
  });

module.exports = usersRouter;