import './App.css';
import { Switch, Route, Link } from 'react-router-dom'
import BookCollection from './pages/BookCollection';
import BookDetail from './pages/BookDetail';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './pages/Profile';
import BookList from './components/BookList'
import BookShelf from './components/bookShelf'

function App() {
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
          <Route exact path='/bookshelf' component={BookShelf} />
      </Switch>

    </div>
  );
}

export default App;

