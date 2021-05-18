import React, { useContext, useEffect } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import BookCollection from './pages/BookCollection';
import BookDetail from './pages/BookDetail';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './pages/Profile';
import BookList from './components/BookList'
import { DataContext } from './context/DataContext'

function App() {

  const { setUserIP } = useContext(DataContext)
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => setUserIP(data))
  }, [])


  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path="/collection/:id" component={BookDetail}/>
        <Route exact path="/collection" component={BookList}/>
        <Route exact path="/latest" component={BookCollection}/>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/register" component={Register} />

        <Route exact path="/" component={Login} />
      </Switch>

    </div>
  );
}

export default App;

