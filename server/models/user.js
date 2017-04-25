const utils = require('../lib/hashUtils');
const Model = require('./model');

// Write your user database model methods here

class User extends Model {
  constructor() {
    super('user'); 
  }



  	// create a new user


  	// let shaUser = crypto.createHash('sha1'); 
  	// shaUser.update(options.uri); 
  	// options.code = shaUser.digest('hex').slice(0, 5); 
  	// return super.create.call(this, options); 


  	//what is the parameter for this 
 

};

module.exports = new User();



/* 

client types in new information into facebook and wants to store info on facebook 

fb takes this info (POST request) and stores it in the server 

if you want to get information from facebook (inquire about something) then you're submitting a get 


*/