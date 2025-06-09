import React from "react";
import {Link} from "react-router-dom";
import GetPositionPlayerCards from "./GetPositionPlayerCards";
import GetPitcherCards from "./GetPitcherCards";
import "../styles/home.css";
function Home(){
    
    
    return (
        <div className="home-container">
            <h1>Top 10 Qualified Hitters by OPS</h1>
            <GetPositionPlayerCards 
            limit={10}
            />      
            <h1>Top 10 Qualified Pitchers by ERA</h1>
            <GetPitcherCards 
            limit={10}
            />      
        </div>
    )
}

export default Home;
