import { Note } from "../models/Note.js";

export const getAllNote = async (req, res) => {
  try { 
    const notes = (await Note.find().sort({createdAt:-1})); //newest first -1 will sort in desc order
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    const note = new Note({
      title: title,
      content: content,
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    },{new: true});
    if (!updatedNote)
      return res.status(404).json({ message: "Note doesn't exist" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note doesn't exist" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNote = async(req, res)=>{
    try {
        const getNote  = await Note.findById(req.params.id);
        if(!getNote) return res.status(404).json({ message: "Note doesn't exist" });
        res.status(200).json(getNote);
    } catch (error) {
        console.error("Error in getNote controller", error);
    res.status(500).json({ message: "Internal server error" });
    }
}
