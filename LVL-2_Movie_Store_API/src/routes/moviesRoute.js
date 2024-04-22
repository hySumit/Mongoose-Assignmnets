const express = require("express");
const movieModel = require("../models/movies.schema");

const moviesRouter = express.Router();

moviesRouter.get('/', async (req, res) => {
    try {
      let query = {};
      if (req.query.title) {
        query.title = { $regex: req.query.title, $options: 'i' }; 
      }
      if (req.query.rating) {
        query.rating = req.query.rating;
      }
  
      const movies = await movieModel.find(query).sort(req.query.sortBy || 'title');
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// get request
moviesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movies = await movieModel.findById(id);
    if (!movies) {
      return res.status(400).send("No Movie Found");
    }
    res.send(movies);
  } catch (error) {
    console.log(error);
  }
});

// post request
moviesRouter.post("/", async (req, res) => {
  try {
    const newMovie = new movieModel(req.body);
    await newMovie.save();
    res.json(newMovie);
    console.log("movies added succesfully");
  } catch (error) {
    console.log(error);
  }
});

// patch
moviesRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updateMovie = await movieModel.findByIdAndUpdate(id, req.body);
    res.status(201).send("movie updated succesfully");
  } catch (error) {
    console.log(error);
  }
});

// delete
moviesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteMovie = await movieModel.findByIdAndDelete(id);
    res.status(200).send("Movie deleted succesfully");
    // res.json
  } catch (error) {
    console.log(error);
  }
});

module.exports = moviesRouter;
