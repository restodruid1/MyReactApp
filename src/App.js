import logo from './logo.svg';
import './styles/App.css';
import React from "react";
import GetPositionPlayerCards from './Components/GetPositionPlayerCards';
import GetPitcherCards from './Components/GetPitcherCards';
import TeamPage from './Components/TeamPage'; 
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import PlayerPage from './Components/PlayerPage';

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
          <Route path='/team/:teamName' element={<TeamPage />}/>
          <Route path='/player/:playerName/id/:playerId' element={<PlayerPage/>}/>
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
