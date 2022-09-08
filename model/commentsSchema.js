// const mongoose = require('mongoose');
// const CommentsSchema = mongoose.Schema({
//     userId:{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     },
//     comment: {
//         type: String,
//         required: true,
//         minLength: 1,
//         maxLength: 300,
//     },
//     postedAt:{
//       type: Date,
//       default: Date.now
//     },
//     updatedAt:{
//       type: Date,
//       default: Date.now
//     }
//   });

//   module.exports = mongoose.model('comments', CommentsSchema);