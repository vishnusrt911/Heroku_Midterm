// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');  ()=>{}

// call the movies model
let movies = require('../models/movies');

/* GET movies List page. READ */
router.get('/', (req, res, next) => {
  // find all movie in the books collection
  movies.find( (err, list) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('movies/index', {
        title: 'Movies',
        list: list
      });
    }
  });
});

//  GET the Movies Details page in order to add a new Movies
router.get('/add', (req, res, next) => {
  res.render('movies/details',{title : 'Add Movie',list:[]});
});

//Display page for editing the Movie
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  movies.findById(id,(err,MovieToEdit)=>{ //Storing the result into MovieToEdit Object
      if(err){
          console.log(err);
          res.end(err);
      }
      else{
          res.render('movies/details',{title:'Edit a Book ',list:MovieToEdit})
      }
  });
});

//Process the edit movie page 
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  let updateMovie = movies({
    "_id": id,
    "Title": req.body.title,
    "Description": req.body.description,
    "Released": req.body.released,
    "Director": req.body.director,
    "Genre": req.body.genre
});

movies.updateOne({_id:id},updateMovie, (err)=>{
  if(err){
      console.log(err);
      res.end(err);
  }
  else{
      res.redirect('/movies');
  }
});
});


// POST process the Movies Details page and create a new Movies - CREATE
router.post('/add', (req, res, next) => {
console.log(req.body.Title);
  let newMovie = movies({
    "Title": req.body.title,
    "Description": req.body.description,
    "Released": req.body.released,
    "Director": req.body.director,
    "Genre": req.body.genre
    });
    movies.create(newMovie,(err,_)=>{
      if(err){
      console.log(err);
      res.end(err);
      }
      else{
          res.redirect('/movies');
      }
  });

});


// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;
  movies.remove({_id:id},(err) =>{
      if(err){
          console.log(err);
          res.end(err);
      }
      else{
          res.redirect('/movies');
      }
  });
});


module.exports = router;
