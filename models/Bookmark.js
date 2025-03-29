import mongoose from 'mongoose'

const bookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true }
}, { timestamps: true })

export default mongoose.models.Bookmark || mongoose.model('Bookmark', bookmarkSchema)