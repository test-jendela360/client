import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home/';
import Sales from './pages/Sales/';
import Login from './pages/Login/';
import Navbar from './components/navbar';
import FormEdit from './components/formEditCar';
import FormAdd from './components/formAddCar';
import FormAddSale from './components/formAddSale';
import FormEditSale from './components/formEditSale';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Navbar/>
          <Home/>
        </Route>
        <Route path='/sales'>
          <Navbar/>
          <Sales/>
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/add-car'>
          <Navbar/>
          <FormAdd/>
        </Route>
        <Route path='/add-sale'>
          <Navbar/>
          <FormAddSale/>
        </Route>
        <Route path='/edit-car/:id'>
          <Navbar/>
          <FormEdit/>
        </Route>
        <Route path='/edit-sale/:id'>
          <Navbar/>
          <FormEditSale/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
