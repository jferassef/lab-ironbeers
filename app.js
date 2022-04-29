const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromAPI => {
      res.render('beers', { beersFromAPI });
    })
    .catch(error => console.log(error));
});

app.get('/randombeer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(randomFromAPI => {
      res.render('randomBeer', { randomFromAPI });
    })
    .catch(error => {
      console.log(error);
    });
});

// extra: create partial and hide random extra properties when random page is click showthem
//Bonus 6
// create a function that returns the ID of the clicked beer
/* function clickedID() {
  const clickedBeer = document.querySelector('.clicked');
  clickedBeer.addEventListener('click', target => {
    return target.id;
  });
}

app.get('/clickedbeer', (req, res) => {
  punkAPI
    .getBeer(clickedID)
    .then(beerFromAPI => {
      res.render('beers', { beerFromAPI });
    })
    .catch(error => console.log(error));
}); */

app.listen(3000, () => console.log('🏃‍ on port 3000'));
