const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const config = {
  user: 'drillaxholic',
  host: '127.0.0.1',
  database: 'homeWork14',
  port: 5432,
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */
/*
    *************************************************************
    *************************************************************
                          Home
    *************************************************************
    ************************************************************* 
*/

app.get('/', (req, response) => {
  let queryString = 'SELECT * from pokemon'
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
    } else {
      console.log('query result:', result);
      let content = { pokemon : result.rows }
      response.render('Home', content);

      // redirect to home page
      response.redirect('/');
    }
  });
});

/*--------------------Create pokemon--------------------------*/
app.get('/pokemon/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

/*
    *************************************************************
    *************************************************************
                          Creating Pokemon
    *************************************************************
    ************************************************************* 
*/

app.post('/pokemon', (req, response) => {
  let content = req.body
  let queryString = 'INSERT INTO pokemon(name, num, img, weight, height) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const value = [content.name, content.num, content.img, content.weight, content.height];
  pool.query(queryString, value, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
    }
    // redirect to home page
    response.redirect('/');
  });
});
/*--------------------Edting pokemon--------------------------*/
app.get('/pokemon/:id/edit', (req, response) => {
  let queryString = 'SELECT * FROM pokemon WHERE id=' + req.params.id;
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
    }
    let content = { pokemon : result.rows[0]};
    response.render('Edit', content);
  });
});

/*
    *************************************************************
    *************************************************************
                          Update Pokemon
    *************************************************************
    ************************************************************* 
*/

app.put('/pokemon/:id/edit', (req, response) => {
  let content = req.body;
  let queryString = 'UPDATE pokemon SET num=$1,  name=$2, img=$3, height=$4, weight=$5 WHERE id =$6';
  const values = [content.num,content.name, content.img, content.height, content.weight, req.params.id];
  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
    }
    // redirect to home page
      response.redirect('/pokemon/'+req.params.id);
  });
});

/*
    *************************************************************
    *************************************************************
                          Delete Pokemon
    *************************************************************
    ************************************************************* 
*/

app.delete('/pokemon/:id/edit', (req, response) => {
  let queryString = 'DELETE from pokemon WHERE id =' + req.params.id;
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
    }
    // redirect to home page
      response.redirect('/');
  });
});

/*
    *************************************************************
    *************************************************************
                          Viewing of Pokemon
    *************************************************************
    ************************************************************* 
*/

app.get('/pokemon/:id', (req, response) => {
  // query database for all pokemon
  // respond with HTML page displaying all pokemon
  let queryString = "SELECT * FROM pokemon WHERE id = " + req.params.id;
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
    }
    let content = { pokemon : result.rows[0] }
    response.render('Id', content);
    
      // redirect to home page
      response.redirect('/');
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
