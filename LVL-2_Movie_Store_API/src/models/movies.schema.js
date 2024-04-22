const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    genre: {
      type: String,
      enum: ["adventure","horror","sci-fi","romance","mystery","thriller"],
    },
    release: { type: Number },
    rating: { type: Number },
  },
  { versionKey: false }
);

const movieModel = model("movie",movieSchema)

module.exports = movieModel