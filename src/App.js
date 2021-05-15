import './App.css';
import { Switch, Route } from 'react-router-dom'
import BookCollection from './pages/BookCollection';
import BookDetail from './pages/BookDetail';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './pages/Profile';
import BookList from './components/BookList'

function App() {

  var http = require('http');

  http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
    resp.on('data', function(ip) {
      console.log("My public IP address is: " + ip);
    });
  });

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

