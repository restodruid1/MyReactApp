import React from "react"; 
import { Link } from "react-router-dom";
import { teams } from "./PlayerCard";

function DropdownTeams(){
    const teamIds = Object.keys(teams);
    console.log(teamIds);
    const divisions = [
        {"NL West": ["D-backs","Dodgers","Giants","Padres","Rockies"]},
        {"NL East": ["Braves","Marlins","Mets","Nationals","Phillies"]},
        {"NL Central": ["Brewers","Cardinals","Cubs","Pirates","Reds"]},
        {"AL West": ["Angels","Astros","Athletics","Mariners","Rangers"]},
        {"AL East": ["Blue Jays","Orioles","Rays","Red Sox","Yankees"]},
        {"AL Central": ["Guardians","Royals","Tigers","Twins","White Sox"]},
    ]
    
    return (
        <div className="dropdown">
             <div>
                {divisions.map((divisionObj, index) => {
                    const [divisionName, teams] = Object.entries(divisionObj)[0];
                    return (
                    <div key={index}>
                        <h2>{divisionName}</h2>
                        {teams.map((team, i) => (
                            <p key={i}><Link to={`/team/${team}`}>{team}</Link></p>
                        ))}
                    </div>
                    );
                })}
            </div>
        </div>
    );
}

export default DropdownTeams;