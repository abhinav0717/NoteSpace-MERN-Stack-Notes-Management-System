
import { Router } from 'express';

import protect from '../middleware/authMiddleware.js';

import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from '../controllers/noteController.js';

const router = Router();

// Protect all note routes
router.use(protect);

// Create and get all notes
router.route('/')
  .post(createNote)
  .get(getNotes);

// Get, update and delete a single note
router.route('/:id')
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

export default router;
    