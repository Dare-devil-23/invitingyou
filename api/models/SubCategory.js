const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cards: [{type:mongoose.Schema.Types.ObjectId, ref:'Card'}]
}, { timestamps: true });

const SubCategoryModel = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategoryModel