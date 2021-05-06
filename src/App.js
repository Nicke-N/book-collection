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

      
        <ul>
          <li>
            <Link to='/collection'>Collection</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/Profile'>Profile</Link>
          </li>
        </ul>
 




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
