import React, { useEffect, useState } from "react";
import { ArrowLeft, Trash } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";

const NoteDetailPage = ({}) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        const note = await api.get(`/notes/${id}`);
        setTitle(note.data.title);
        setContent(note.data.content);
      } catch (error) {
        console.error("Failed to fetch note", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, { title, content });
      navigate("/");
      toast.success("Note updated successfully");
    } catch (error) {
      console.log("Failed to create a note");
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  //DELETE note
  const deleteNote = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete note", error);
      toast.error("Failed to delete note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white h-screen w-screen p-5">
      <div className="flex justify-between">
        <Link to="/">
          <div className="cursor-pointer flex items-center gap-2 transition duration-300 hover:text-green-600">
            <ArrowLeft size={20} />
            <span>Back to Notes</span>
          </div>
        </Link>
        <div
          onClick={deleteNote}
          className="cursor-pointer flex items-center gap-1 rounded-4xl bg-green-700 transition duration-300 hover:bg-green-600 px-2 py-1"
        >
          <Trash size={15} />
          <span>Delete Note</span>
        </div>
      </div>
      <div className="m-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-2 font-medium text-green-200">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 rounded-md bg-gray-900 border focus:outline-none focus:border-green-300 text-white placeholder-gray-500 transition"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <label
              htmlFor="content"
              className="mb-2 font-medium text-green-200"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              className="p-3 rounded-md bg-gray-900 border focus:outline-none focus:border-green-300 text-white placeholder-gray-500 transition"
            ></textarea>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className={`cursor-pointer mt-4 bg-green-500 text-black font-semibold py-2 rounded-md hover:bg-green-400 transition ${
              saving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteDetailPage;
