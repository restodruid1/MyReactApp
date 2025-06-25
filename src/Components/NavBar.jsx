import React from "react";
import '../styles/NavBar.css'
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DropdownStats from "./DropdownStats";
import DropdownTeams from "./DropdownTeams";
import DropdownStandings from "./DropdownStandings";

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
    const [isStandingsEntered, setIsStandingsEntered] = React.useState(false);
    // const date = new Date();
    // const year = date.getFullYear();
    const navigate = useNavigate();
    

    function handleClick(event){
        // console.log("event clicked: " + event);
        navigate("/");
    }

    return (
        <nav className="navbar-home">
            <img 
            style={{height:"50px", position:"absolute", left:"0px", borderRadius:"15%", cursor:"pointer"}}
            src="/baseball-logo.png"
            alt="Baseball Logo"
            onClick={handleClick}
            />
            <div className="nav-items">
                {/* <label>Search For a Player</label> */}
                <input required type="search" placeholder="Player Search"/>
                <button>Search</button>
            </div>
            <div style={isStatsEntered ? {backgroundColor:"white", color:"black"} : {backgroundColor:"darkblue", color:"white"}} className="nav-items" onMouseEnter={()=>setIsStatsEntered(true)} onMouseLeave={()=>setIsStatsEntered(false)}>
                <p className="nav-stats">Stats</p>
                {isStatsEntered && (
                    <DropdownStats/>
                )}

            </div>
            <div style={isTeamsEntered ? {backgroundColor:"white", color:"black"} : {backgroundColor:"darkblue", color:"white"}} className="nav-items" onMouseEnter={()=>setIsTeamsEntered(true)} onMouseLeave={()=>setIsTeamsEntered(false)}>
                <p className="nav-stats">Teams</p>
                {isTeamsEntered  && (
                    <DropdownTeams/>
                )}  
            </div>
            <div style={isStandingsEntered ? {backgroundColor:"white", color:"black"} : {backgroundColor:"darkblue", color:"white"}} className="nav-items" onMouseEnter={()=>setIsStandingsEntered(true)} onMouseLeave={()=>setIsStandingsEntered(false)}>
                <p className="nav-stats">Standings</p>
                {isStandingsEntered  && (
                    <DropdownStandings/>
                )}  
            </div>
        </nav>
    );
}

export default NavBar;