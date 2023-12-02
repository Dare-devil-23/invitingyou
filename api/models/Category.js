const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  hero_banner: {
    type: String,
  },
  sub_categories: [{type:mongoose.Schema.Types.ObjectId, ref:'SubCategory'}]
}, { timestamps: true });

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel