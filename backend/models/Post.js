const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  completed: {type: Boolean, required:true},
  dateCompleted: {type: String},
});


//Export model
module.exports = mongoose.model("Post", PostSchema);