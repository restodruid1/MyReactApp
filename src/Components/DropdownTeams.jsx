import React from "react"; 
import { Link } from "react-router-dom";
import CustomLink from "./CustomLink";
import { teams } from "./PlayerCard";
import "../styles/dropdown.css";

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
                    const [divisionName, listOfTeams] = Object.entries(divisionObj)[0];
                    return (
                        <div key={index} className="team-dd-flex-item team-container">
                            <p>{divisionName}</p>
                            <CustomLink teamName={listOfTeams[0]} color={teams[listOfTeams[0]].primaryColor}/>
                            <CustomLink teamName={listOfTeams[1]} color={teams[listOfTeams[1]].primaryColor}/>
                            <CustomLink teamName={listOfTeams[2]} color={teams[listOfTeams[2]].primaryColor}/>
                            <CustomLink teamName={listOfTeams[3]} color={teams[listOfTeams[3]].primaryColor}/>
                            <CustomLink teamName={listOfTeams[4]} color={teams[listOfTeams[4]].primaryColor}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default DropdownTeams;