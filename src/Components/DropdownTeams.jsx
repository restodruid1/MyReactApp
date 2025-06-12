import React from "react"; 
import { Link } from "react-router-dom";


function DropdownTeams(){
    
    const divisions = [
        {"NL West": ["D-backs","Dodgers","Giants","Padres","Rockies"]},
        {"AL West": ["Angels","Astros","Athletics","Mariners","Rangers"]},
        {"NL East": ["Braves","Marlins","Mets","Nationals","Phillies"]},
        {"AL East": ["Blue Jays","Orioles","Rays","Red Sox","Yankees"]},
        {"NL Central": ["Brewers","Cardinals","Cubs","Pirates","Reds"]},
        {"AL Central": ["Guardians","Royals","Tigers","Twins","White Sox"]},
    ]
    
    return (
        <div className="dropdown"> 
             <div className="team-dd-container">
                {divisions.map((divisionObj, index) => {
                    const [divisionName, teams] = Object.entries(divisionObj)[0];
                    return (
                        <div className="team-dd-flex-item team-container">
                            <p>{divisionName}</p>
                            <Link to={`/team/${teams[0]}`}>{teams[0]}</Link>
                            <Link to={`/team/${teams[1]}`}>{teams[1]}</Link>
                            <Link to={`/team/${teams[2]}`}>{teams[2]}</Link>
                            <Link to={`/team/${teams[3]}`}>{teams[3]}</Link>
                            <Link to={`/team/${teams[4]}`}>{teams[4]}</Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default DropdownTeams;