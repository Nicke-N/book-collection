import './App.css';
import { Switch, Route } from 'react-router-dom'
import BookCollection from './pages/BookCollection';
import BookDetail from './pages/BookDetail';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>

          <Route path="/collection/:id" component={BookDetail}/>
          <Route path="/collection" component={BookCollection}/>
         
      </Switch>

    </div>
  );
}

export default App;
