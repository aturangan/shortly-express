const crypto = require('crypto');
const Model = require('../models/model');

/************************************************************/
// Add any hashing utility functions below
/************************************************************/

// const cert1 = new crypto.Certificate(); 
// const cert2 = crypto.Certificate();  

class Hash extends Model {
  constructor() {
  	super('users')
  }

  hash(password) {
    let shasum = crypto.createHash('sha1');
    shasum.update(password);
    password = shasum.digest('hex').slice(0, 5);
    // console.log('LINK CODE', link);
    return(password)
    //return super.create.call(this, link);
  }

}
module.exports = new Hash();
