import React from "react";
import '../styles/NavBar.css'
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

function NavBar(){  
    /*
    Sharing state by combining these was causing React to miss mouse leave event
    resulting in both states being true.
        const [isEntered, setIsEntered] = React.useState({
        stats: false,
        teams: false,
    });*/
    const [isStatsEntered, setIsStatsEntered] = React.useState(false);
    const [isTeamsEntered, setIsTeamsEntered] = React.useState(false);
    const testData = [
        {
            title:"hitters",
            year: 2025,
            route:"/hitters"
        },
        {
            title:"hitters",
            year: 2024,
            route:"/hitters"
        },
        {
            title:"hitters",
            year: 2023,
            route:"/hitters"
        }
    ]

    return (
        <nav className="navbar-home">
            <div className="nav-items">
                <label>Search For a Player</label>
                <input required type="search "/>
                <button>Search</button>
            </div>
            <div className="nav-items" onMouseEnter={()=>setIsStatsEntered(true)} onMouseLeave={()=>setIsStatsEntered(false)}>
                <p className="nav-stats">Stats</p>
                {/* {isStatsEntered  && (
                    <Dropdown
                    title={"hitters"}
                    route={"/hitters"}
                    content={"2025"}/>
                )}   */}
                {isStatsEntered && (
                    <Dropdown 
                    data={testData}/>
                )
                }

            </div>
            <div className="nav-items" onMouseEnter={()=>setIsTeamsEntered(true)} onMouseLeave={()=>setIsTeamsEntered(false)}>
                <p className="nav-stats">Teams</p>
                {isTeamsEntered  && (
                    <Dropdown 
                    data={testData}/>
                )}  
            </div>
        </nav>
    );
}

export default NavBar;