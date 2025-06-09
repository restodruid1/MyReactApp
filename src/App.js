import logo from './logo.svg';
import './styles/App.css';
import React from "react";
import GetCards from './Components/GetPositionPlayerCards';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

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
      <NavBar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/hitters' element={<GetCards />}/>
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
