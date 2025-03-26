// models/Bookmark.js
import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bookmark = mongoose.models.Bookmark || mongoose.model('Bookmark', BookmarkSchema);

export default Bookmark;
