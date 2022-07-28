const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Course = new Schema({
  _id: {type:Number,},
  name: {type: String,require: true},
  description:  {type: String},
  image:  {type: String},
  videoID:  {type: String},
  deletedAt: {type: Date},
  slug: {type: String, slug:'name',unique: true},
},
{
  _id:false,
  timestamps:true,
});

mongoose.plugin(slug);
Course.plugin(AutoIncrement)
Course.plugin(mongooseDelete,{overrideMethods: 'all', deletedAt:'true'})

module.exports = mongoose.model('Course',Course);