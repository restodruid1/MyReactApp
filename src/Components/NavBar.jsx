import React from "react";
import '../styles/NavBar.css'
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

function NavBar(){
    const [isEntered, setIsEntered] = React.useState({
        stats: false,
        teams: false,
    });
    
    const navComp = [{
        name: "stats",
        title:"Hitters",
        route:"/hitters",
        content:"2025",
    }, {
        name: "teams",
        title:"Red Sox",
        route:"/hitters",
        content:"2025",
    }];

    return (
        <nav className="navbar-home">
            <div className="nav-items">
                <label>Search For a Player</label>
                <input required type="search "/>
                <button>Search</button>
            </div>
            {navComp.map((element, index)=>{
                const eleName = index === 0 ? isEntered.stats: isEntered.teams;
                return (
                    <div className="nav-items" onMouseEnter={()=>setIsEntered({...isEntered, [element.name]:true})} onMouseLeave={()=>setIsEntered({...isEntered, [element.name]:false})}>
                        <p className="nav-stats">{element.name}</p>
                        {eleName && (
                            <Dropdown
                            key={index} 
                            title={element.title}
                            route={element.route}
                            content={element.content}/>
                        )}  
                    </div>
                );
            })}


            {/* <div className="nav-items" onMouseEnter={()=>setIsEntered({...isEntered, stats:true})} onMouseLeave={()=>setIsEntered({...isEntered, stats:false})}>
                <p className="nav-stats">Stats</p>
                {isEntered.stats && !isEntered.teams && (
                    <Dropdown
                    key={1} 
                    title={"hitters"}
                    route={"/hitters"}
                    content={"2025"}/>
                )}  
            </div>
            <div className="nav-items" onMouseEnter={()=>setIsEntered({...isEntered, teams:true})} onMouseLeave={()=>setIsEntered({...isEntered, teams:false})}>
                <p className="nav-stats">Teams</p>
                {isEntered.teams && !isEntered.stats && (
                    <Dropdown
                    key={2} 
                    title={"Red Sox"}
                    route={"/hitters"}
                    content={"2025"}/>
                )}  
            </div> */}
        </nav>
    );
}

export default NavBar;