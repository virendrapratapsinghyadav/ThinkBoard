import express from 'express'
import {getAllNote, getNote, createNote, updateNote, deleteNote} from '../controllers/notesController.js'

const router = express.Router();

router.get("/", getAllNote);
router.get("/:id", getNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);



export default router;