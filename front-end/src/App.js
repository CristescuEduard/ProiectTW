import Header from './components/Header/Header';
import Login from './components/Login/Login'
import Home from './components/Home/Home';
import FoodList from './components/FoodList/FoodList'
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom';
import React from 'react';
import './App.css';
import Allert from './components/Allert/Allert';
import AddProducts from './components/AddProducts/AddProducts';
import AvailableFood from './components/AvailableFood/AvailableFood';
import Cart from './components/Cart/Cart';
import Register from './components/Register/Register';

function App() {

  localStorage.setItem("afisat",0);
  return (
    <div className='back'>
      <Router>
        <Routes>
        <Route path="/" exact element={<Login />}></Route>
          <Route path="/register" exact element={<Register />}></Route>
          <Route path="/login" exact element={<Home />}></Route>
          <Route path="/seeProducts" exact element={<FoodList />}></Route>
          <Route path="/addProducts" exact element={<AddProducts />}></Route>
          <Route path="/cart" exact element={<Cart />}></Route>
          <Route path="/seeClaimableProducts" exact element={<AvailableFood />}></Route>
        </Routes>
      </Router>
    </div>
  );
}


export default App;

