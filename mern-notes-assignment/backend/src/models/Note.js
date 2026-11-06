
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true,
      maxlength: 120
    },

    content: {
      type: String,
      required: [true, 'Note content is required'],
      trim: true
    },

    category: {
      type: String,
      enum: [
        'Personal',
        'Study',
        'Project',
        'Work',
        'Activity',
        'Other'
      ],
      default: 'Personal'
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Export Note model
const Note = mongoose.model('Note', noteSchema);

export default Note;
