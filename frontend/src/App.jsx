import { useState } from 'react'
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import {toast} from 'react-hot-toast'
import './App.css'
import RateLimited from './components/RateLimited';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/create' element={<CreatePage/>} />
      <Route path='/notes/:id' element={<NoteDetailPage/>} />
    </Routes>
    </>
  )
}
export default App
