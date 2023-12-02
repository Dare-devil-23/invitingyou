const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  name: { type: String, required: true },
  image: { type: String, required: true },
  designer: { type: String, index:true },
  color: { type: String, index:true },
  shape: { type: String, index:true },
  price: { type: Number, required: true, index:true }
});

const CardModel = mongoose.model('Card', cardSchema);

module.exports = CardModel