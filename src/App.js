import React, { useContext, useEffect } from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import BookCollection from './pages/BookCollection';
import Profile from './pages/Profile';
import Latest from './pages/Latest'
import Credits from './pages/Credits'
import { DataContext } from './context/DataContext'
import NavigationPanel from './components/NavigationPanel';
import Modal from './components/Modal';
import ProfilePanel from './components/ProfilePanel';
import BookDetail from './pages/BookDetail';
import Header from './components/Header';

function App() {

  const { setUserIP, modalData } = useContext(DataContext)

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIP(data))
  }, [])


  return (
    <div className="App">
      <Header />
      <NavigationPanel />
      <ProfilePanel />
      <Routes>
        <Route exact path="/collection/:id" element={<BookDetail />} />
        <Route exact path="/credits" element={<Credits />} />
        <Route exact path="/latest" element={<Latest />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/" element={<BookCollection />} />
      </Routes>
      <Modal data={modalData} />
    </div>
  );
}
export default App;

