const express = require('express');
const path = require('path');
const utils = require('./lib/hashUtils');
const partials = require('express-partials');
const bodyParser = require('body-parser');
const Auth = require('./middleware/auth');
const models = require('./models');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(partials());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from ../public directory
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', 
(req, res) => {
  res.render('index');
});

app.get('/create', 
(req, res) => {
  res.render('index');
});

app.get('/links', 
(req, res, next) => {
  models.Links.getAll()
    .then(links => {
      res.status(200).send(links);
    })
    .error(error => {
      res.status(500).send(error);
    });
});

app.post('/links', 
(req, res, next) => {
  var url = req.body.url;
  if (!models.Links.isValidUrl(url)) {
    // send back a 404 if link is not valid
    return res.sendStatus(404);
  }

  return models.Links.get({ url })
    .then(link => {
      if (link) {
        throw link;
      }
      return models.Links.getUrlTitle(url);
    })
    .then(title => {
      return models.Links.create({
        url: url,
        title: title,
        baseUrl: req.headers.origin
      });
    })
    .then(results => {
      return models.Links.get({ id: results.insertId });
    })
    .then(link => {
      throw link;
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(link => {
      res.status(200).send(link);
    });
});


app.post('/signup', (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  // var obj = req.body
  var hashedPassword = utils.hash(password); //<-- hashed password from utils.create function
  models.User.create({username: username, password: hashedPassword})

  .then( () => {
    res.redirect(302, '/');  //<-- redirects to index after user is created
  })                   // res.redirect calls res.end() as well. call next() for middleware
  .error( (err) => {
    res.redirect(404, '/signup');  //<-- redirects signup.
  });
});


app.post('/login', (req, res, next) => {
  // determine if login password and username match
  var username = req.body.username;
  var password = req.body.password;
  var hashedPassword = utils.hash(password);
  
  models.User.get({username: username, password: hashedPassword})
  
  // res.redirect(302, '/')
  .then( (data) => {
    if (data === undefined) {
      res.redirect(404, '/login'); 
    } else {
      res.redirect(302, '/'); 
    }
    // if (data.username === username && data.password === hashedPassword){
    //   res.redirect(302, '/');
    // } else {
    //   res.redirect(404, '/login');  //<-- redirects to login.
    // }
  });
  // .error( (err) => {
  // });


});


/************************************************************/
// Write your authentication routes here
/************************************************************/



/************************************************************/
// Handle the code parameter route last - if all other routes fail
// assume the route is a short code and try and handle it here.
// If the short-code doesn't exist, send the user to '/'
/************************************************************/

app.get('/:code', (req, res, next) => {

  return models.Links.get({ code: req.params.code })
    .tap(link => {

      if (!link) {
        throw new Error('Link does not exist');
      }
      return models.Clicks.create({ linkId: link.id });
    })
    .tap(link => {
      return models.Links.update(link, { visits: link.visits + 1 });
    })
    .then(({ url }) => {
      res.redirect(url);
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(() => {
      res.redirect('/');
    });
});

module.exports = app;
