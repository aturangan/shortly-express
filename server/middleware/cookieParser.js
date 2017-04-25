const parseCookies = (req, res, next) => {
 //  var headers = {
 //    Cookie: ''
 //  }
	// var statusCode; 

  console.log('####################', req.headers.cookie);
  console.log('################### Parse', req.headers.cookie);

  var cookies = req.headers.cookie;
  cookies = cookies.split('; ');
  console.log('cookie type ', typeof cookies);

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
  // next();
};

module.exports = parseCookies;