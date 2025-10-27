import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import api from '../lib/axios.js'
import {toast} from 'react-hot-toast'

const CreatePage = () => {

  const[title, setTitle] = useState("");
  const[content, setContent] = useState("");
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return
    }
    setLoading(true);
    try {
      await api.post("/notes" ,{title, content});
      navigate('/');
      toast.success("Note created Successfully")
    } catch (error) {
      console.log("Failed to create a note");
      toast.error("Failed to create Note")
    }
    finally{
      setLoading(false);
    }
  }


  return (
    <div className="bg-black text-white w-screen h-screen p-10">
      {/* Back Button */}
      <Link to='/'>
      <div className="flex items-center gap-3 mb-10 cursor-pointer text-green-400 hover:text-green-300 transition">
        <ArrowLeft size={20} />
        <span className="text-lg font-medium">Back to Notes</span>
      </div>
      </Link>

      {/* Form Container */}
      <div className="bg-[rgb(29,26,26)] p-8 rounded-2xl shadow-[0_0_15px_rgba(34,197,94,0.3)] max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center text-green-400">
          Create New Note
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-2 text-sm font-medium text-green-200">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              placeholder="Enter the title"
              onChange={(e)=>setTitle(e.target.value)}
              className="p-3 rounded-md bg-gray-900 border focus:outline-none focus:border-green-300 text-white placeholder-gray-500 transition"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <label htmlFor="content" className="mb-2 text-sm font-medium text-green-200">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              placeholder="Enter the content"
              rows="5"
              onChange={(e)=>setContent(e.target.value)}
              className="p-3 rounded-md bg-gray-900 border focus:outline-none focus:border-green-300 text-white placeholder-gray-500 transition"
            ></textarea>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="cursor-pointer mt-4 bg-green-500 text-black font-semibold py-2 rounded-md hover:bg-green-400 transition"
          >
            {loading? "saving..." : "Save Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
