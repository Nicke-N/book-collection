import './App.css';
import { Switch, Route, Link } from 'react-router-dom'
import BookCollection from './pages/BookCollection';
import BookDetail from './pages/BookDetail';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <Header/>

      <Switch>

          <Route path="/collection/:id" component={BookDetail}/>
          <Route path="/collection" component={BookCollection}/>
          <Route path="/profile" component={Profile} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Login} />
      </Switch>

    </div>
  );
}

export default App;

