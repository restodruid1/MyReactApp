import logo from './logo.svg';
import './styles/App.css';
import React from "react";
import GetPositionPlayerCards from './Components/GetPositionPlayerCards';
import GetPitcherCards from './Components/GetPitcherCards';
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
          <Route path='/hitters' element={<GetPositionPlayerCards />}/>
          <Route path='/pitchers' element={<GetPitcherCards />}/>
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
