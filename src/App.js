import logo from './logo.svg';
import './styles/App.css';
import React from "react";
import GetCards from './Components/GetCards';
import Home from './Components/Home';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/hitters' element={<GetCards />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
