import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import RateLimited from '../components/RateLimited';
import NotesNotFound from '../components/NotesNotFound';
import api from '../lib/axios.js'
import toast from 'react-hot-toast';

const HomePage = () => {

  const[israteLimited, setIsrateLimited] = useState(false);
  const[notes, setNotes] = useState([]);
  const[selectedNote, setSelectedNote] = useState(null);
  const[loading, setLoading] = useState(true);

  
  //Fetch all the notes from the Backend
  useEffect(()=>{
    const fetchNotes = async()=>{
      try {
        const res = await api.get("/notes");
        const filteredNotes = res.data.map(note=>({
          id: note._id,
          title: note.title,
          content: note.content,
          updatedAt: note.updatedAt
        }))
        console.log(filteredNotes);
        setNotes(filteredNotes);
      } catch (error) {
        console.log("Can't fetch data", error);
        if(error.response.status === 429){
          setIsrateLimited(true);
        }
        else{
          toast.error("Failed to fetch notes");
        }
      }
      finally{
        setLoading(false)
      }
    };
    fetchNotes();
  },[]);
  
  return (
    <div className='bg-black text-white w-screen h-screen z-10'>
      <div>
        <Navbar/>
      </div>
      {/* <hr className='text-green-600 m-2'/> */}
      {loading && <p className='text-center text-xl mt-20'>Loading...</p>}
      {notes.length === 0 && !israteLimited && <NotesNotFound/> }
      {!loading && !israteLimited && (
         <div className='flex flex-wrap items-center justify-center gap-10 m-20'>
        {
          notes.map(note=>(
            <NoteCard
             key={note.id}
             id={note.id}
             title={note.title}
             content={note.content}
             updatedAt={note.updatedAt}
             setNotes = {setNotes}
             updateNote = {updateNote}
            />
          ))
        }
      </div>
      )}
      {
        israteLimited && <RateLimited/>
      }
    </div>
  )
}

export default HomePage
