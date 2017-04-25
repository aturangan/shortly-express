const utils = require('../lib/hashUtils');
const Model = require('./model');


// Write your user database model methods here

class User extends Model {
  constructor() {
    super('users'); 
  }

  //isValidUser method? 

  
  // isValidUser(user) {
  // 	return user.match(this.)
  // }

  // get(data) {
  //   let parsedOptions = parseData(data);
  //   let queryString = `SELECT username FROM users WHERE ${parsedOptions.string.join(' AND ')}`;
  //   return executeQuery(queryString, parsedOptions.values).spread(results => results);
  // }
}



module.exports = new User();



/* 

client types in new information into facebook and wants to store info on facebook 

fb takes this info (POST request) and stores it in the server 

if you want to get information from facebook (inquire about something) then you're submitting a get 


*/