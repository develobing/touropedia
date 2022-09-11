import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    imageFile: String,
    tags: [String],
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('likeCount').get(function () {
  return this.likes.length;
});

export default mongoose.model('Tour', tourSchema);
