import { useState } from 'react';
import api from '../lib/axios.js'
import { SquarePen, Trash } from 'lucide-react';
import { Link } from 'react-router';
import {toast} from 'react-hot-toast'

const NoteCard = ({id, title, content, updatedAt, setNotes}) => {
  

    //Delete a note
   const deleteNote = async(e)=>{
    e.preventDefault();
    try {
      await api.delete(`/notes/${id}`);
      console.log("Deleted successfully");
      setNotes(prev=>prev.filter(note=>note.id !== id));
      toast.success("Deleted Successfully")
    } catch (error) {
      console.log("Failed to Delete", error);
      toast.error("Failed to Delete")
    }
  }

  //Format the date
  const formattedDate = new Date(updatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });


  return (
  <Link to = {`/notes/${id}`}>
    <div className='cursor-pointer border-t-2 border-t-white bg-[rgb(29,26,26)] rounded-2xl w-fit p-4'>
      <div className='font-bold text-xl'>{title}</div>
      <div className='text-xs text-shadow-white'>{content}</div>
      <div className='flex justify-between mt-8 items-center gap-10'>
        <div>{formattedDate}</div>
        <div className='flex gap-2'>
          <div><SquarePen size={16}/></div>
          <div onClick={deleteNote}><Trash size={16}/></div>
        </div>
      </div>
    </div>
  </Link>
  )
}

export default NoteCard
