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
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Tour', tourSchema);
