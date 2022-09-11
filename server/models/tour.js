import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    imageFile: String,
    tags: [String],
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
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
