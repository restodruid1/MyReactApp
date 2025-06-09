import React from "react";
import '../styles/NavBar.css'
import { Link } from "react-router-dom";
import DropdownStats from "./DropdownStats";

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
    const date = new Date();
    const year = date.getFullYear();
    const hitting = [
        {
            title:"Hitting",
            years: [year, year-1, year-2,year-3,year-4],
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
                {isStatsEntered && (
                    <DropdownStats/>
                )
                }

            </div>
            <div className="nav-items" onMouseEnter={()=>setIsTeamsEntered(true)} onMouseLeave={()=>setIsTeamsEntered(false)}>
                <p className="nav-stats">Teams</p>
                {isTeamsEntered  && (
                    <DropdownStats/>
                )}  
            </div>
        </nav>
    );
}

export default NavBar;