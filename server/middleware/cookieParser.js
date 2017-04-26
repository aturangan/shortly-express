const express = require('express');
const models = require('../models');
const utils = require('../lib/hashUtils');
// const Session = require('express-session');
// var mySession = require()//whatever the session path is, too lazy)


const parseCookies = (req, res, next) => {

  // console.log('SESSSSIONN', models.Session.create ). Access to Session's create function

  if (Object.keys(req.headers).length === 0 ) {
    console.log('EMPTYYYYYYYY', req);

    //session object
    //initialize new session 
      //not sure if has to do with session.js (99.5% sure it does
    //require the session file at the top 

    //express.use(session(mySession))

    // if headers is an empty object. 

    // next({});
    next();
  } else {
    var cookieObject = req.headers;
    var cookies = req.headers.cookie;
    var pieces = cookies.split('; '); //gives array of indiv cookies
    //split each piece by the = 
    cookiesArray = cookies.split('=');

    console.log('Cookies Array', cookiesArray);
    var cookieObj = {};

    for (var i = 0; i < pieces.length; i++) {
      var eachCookie = pieces[i].split('=');  // Array
      cookieObj[eachCookie[0]] = eachCookie[1];
    }
    req.cookies = cookieObj;
  }

  res.end(cookieObj);
  next();
};

module.exports = parseCookies;