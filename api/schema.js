import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const Websites = new Schema({
  name: String,
  route: String,
  active: Boolean,
  content: Schema.Types.Mixed,
});

export const Website = mongoose.model('Website', Websites);