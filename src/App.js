import React, { useContext, useEffect } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import BookCollection from './pages/BookCollection';
import BookDetail from './pages/BookDetail';
import Header from './components/Header';
import Profile from './pages/Profile';
import BookList from './components/BookList'
import { DataContext } from './context/DataContext'
import NavigationPanel from './components/NavigationPanel';
import Modal from './components/Modal';
import ProfilePanel from './components/ProfilePanel';

function App() {

  const { setUserIP, modalData } = useContext(DataContext)

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => setUserIP(data))
  }, [])


  return (
    <div className="App">
      <Header/>
      <NavigationPanel />
      <ProfilePanel />
      <Switch>
        <Route exact path="/collection/:id" component={BookDetail}/>
        <Route exact path="/latest" component={BookCollection}/>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/" component={BookList} />
      </Switch>
      <Modal data={modalData} />
    </div>
  );
}

export default App;

