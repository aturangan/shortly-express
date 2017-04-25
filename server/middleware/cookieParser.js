const express = require('express');
const session = require('../session')


var mySession = require(//whatever the session path is, too lazy)


const parseCookies = (req, res, next) => {
  if (Object.keys(req.headers).length === 0 ) {
    //session object
    //initialize new session 
      //not sure if has to do with session.js (99.5% sure it does
    //require the session file at the top 

    //express.use(session(mySession))

    // if headers is an empty object. 

    next({});
  } else {
    var cookieObject = req.headers;
    var cookies = req.headers.cookie;

    var pieces = cookies.split('; '); //gives array of indiv cookies

    //split each piece by the = 

    cookiesArray = cookies.split('=');


      console.log('Cookies Array', cookiesArray)
    var cookieObj = {};

    for (var i = 0; i < pieces.length; i++){
      var eachCookie = pieces[i].split('=');  // Array
      cookieObj[eachCookie[0]] = eachCookie[1];
    }
    req.cookies = cookieObj;
    console.log('DONE', req)    
    // console.log(cookieObj)
    // res.end(cookieObj);
  }

  // get all cookies in a certain format.  shortlyid=18ea4fb6ab3178092ce936c591ddbb90c99c9f66; otherCookie=2a990382005bcc8b968f2b18f8f7ea490e990e78; anotherCookie=8a864482005bcc8b968f2b18f8f7ea490e577b20
  // turn it into by using map. 
  //{ shortlyid: 18ea4fb6ab3178092ce936c591ddbb90c99c9f66,
  //  otherCookie: 2a990382005bcc8b968f2b18f8f7ea490e990e78,
  //  anotherCookie: 8a864482005bcc8b968f2b18f8f7ea490e577b20
  //}

  // return JSON.parse(req.headers.cookie); 

	// req.on(function(err, data) {
 //    // console.log('dataaaaa', data); 
 //    var cookie = JSON.parse(data);  //parse cookies?
 //    data.session = {key: 'value'}; 
 //    //session: {key: 'value'}; 
	// })
	// //parse cookies
	// //assign an object of key value pairs to a session property on the request 
	// res.writeHead(statusCode, headers);
	// res.end(statusCode, headers);

  // console.log('REQUEST!@#!@#!@#' , req.session);
  res.end(cookieObj)
  next();
};

module.exports = parseCookies;