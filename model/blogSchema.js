const mongoose = require('mongoose');

const CommentsSchema = mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userName:{
    type:String,
  },
  comment: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 300,
  },
  postedAt:{
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type: Date,
    default: Date.now
  }
});

const blogSchema = mongoose.Schema({
  title:{
    type: String,
    require: true,
    minLength: 5,
    maxLength: 150
  },
  tagline: {
    type: Array,
  },
  content: [],
  authorDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  Comments: [CommentsSchema],
  postedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('blog', blogSchema);