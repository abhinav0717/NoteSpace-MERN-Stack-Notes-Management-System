
import mongoose from 'mongoose';
import Note from '../models/Note.js';

// CREATE NOTE
export async function createNote(req, res) {
  try {
    const { title, content, category = 'Personal' } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        message: 'Title and content are required.',
      });
    }

    const note = await Note.create({
      title: title.trim(),
      content: content.trim(),
      category,
      userId: req.user._id,
    });

    return res.status(201).json({
      message: 'Note created successfully.',
      note,
    });
  } catch (error) {
    console.error('Create Note Error:', error);

    return res.status(500).json({
      message: error.message || 'Unable to create note.',
    });
  }
}

// GET ALL NOTES
export async function getNotes(req, res) {
  try {
    const notes = await Note.find({
      userId: req.user._id,
    }).sort({ updatedAt: -1 });

    return res.status(200).json({
      count: notes.length,
      notes,
    });
  } catch (error) {
    console.error('Get Notes Error:', error);

    return res.status(500).json({
      message: 'Unable to fetch notes.',
    });
  }
}

// GET SINGLE NOTE
export async function getNoteById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid note ID.',
      });
    }

    const note = await Note.findOne({
      _id: id,
      userId: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        message: 'Note not found.',
      });
    }

    return res.status(200).json({ note });
  } catch (error) {
    console.error('Get Note Error:', error);

    return res.status(500).json({
      message: 'Unable to fetch note.',
    });
  }
}

// UPDATE NOTE
export async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid note ID.',
      });
    }

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        message: 'Title and content are required.',
      });
    }

    const updateData = {
      title: title.trim(),
      content: content.trim(),
    };

    if (category) {
      updateData.category = category;
    }

    const note = await Note.findOneAndUpdate(
      {
        _id: id,
        userId: req.user._id,
      },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        message: 'Note not found.',
      });
    }

    return res.status(200).json({
      message: 'Note updated successfully.',
      note,
    });
  } catch (error) {
    console.error('Update Note Error:', error);

    return res.status(500).json({
      message: error.message || 'Unable to update note.',
    });
  }
}

// DELETE NOTE
export async function deleteNote(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid note ID.',
      });
    }

    const note = await Note.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        message: 'Note not found.',
      });
    }

    return res.status(200).json({
      message: 'Note deleted successfully.',
    });
  } catch (error) {
    console.error('Delete Note Error:', error);

    return res.status(500).json({
      message: 'Unable to delete note.',
    });
  }
}
