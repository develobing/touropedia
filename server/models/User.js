import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  id: { type: String },

  password: {
    type: String,
  },

  googleId: {
    type: String,
  },
});

export default mongoose.model('User', userSchema);
