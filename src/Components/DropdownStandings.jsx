import React from "react"; 
import { teams } from "./PlayerCard";
import CustomLink from "./CustomLink";
import "../styles/dropdown.css";

const teamIds = {
    108:"Angels",
    109:"D-backs",
    110:"Orioles",
    111:"Red Sox",
    112:"Cubs",
    113:"Reds",
    114:"Guardians",
    115:"Rockies",
    116:"Tigers",
    117:"Astros",
    118:"Royals",
    119:"Dodgers",
    120:"Nationals",
    121:"Mets",
    133:"Athletics",
    134:"Pirates",
    135:"Padres",
    136:"Mariners",
    137:"Giants",
    138:"Cardinals",
    139:"Rays",
    140:"Rangers",
    141:"Blue Jays",
    142:"Twins",
    143:"Phillies",
    144:"Braves",
    145:"White Sox",
    146:"Marlins",
    147:"Yankees",
    158:"Brewers",
};


function DropdownStandings() {
    const [nlWest, setNLWest] = React.useState([]);
    const [alWest, setALWest] = React.useState([]);
    const [nlEast, setNLEast] = React.useState([]);
    const [alEast, setALEast] = React.useState([]);
    const [nlCentral, setNLCentral] = React.useState([]);
    const [alCentral, setALCentral] = React.useState([]);

    const divisions = [
        {"NL West": nlWest},
        {"AL West": alWest},
        {"NL East": nlEast},
        {"AL East": alEast},
        {"NL Central": nlCentral},
        {"AL Central": alCentral},
    ]
    

    React.useEffect(()=>{
        const fetchNlStandingsData = async () => {
            const response = await fetch("https://statsapi.mlb.com/api/v1/standings?leagueId=104");
            const data = await response.json();
            
            data.records.map((divisions, index)=>{
                // console.log(divisions[index]);                
                if (divisions.division.id === 203) {    // NL West
                    setNLWest(divisions.teamRecords);
                    localStorage.setItem("NL West", JSON.stringify(divisions));
                } else if (divisions.division.id === 204) { // NL East
                    setNLEast(divisions.teamRecords);
                    localStorage.setItem("NL East", JSON.stringify(divisions));
                } else if (divisions.division.id === 205) { // NL Central
                    setNLCentral(divisions.teamRecords);
                    localStorage.setItem("NL Central", JSON.stringify(divisions));
                }
                // console.log(divisions.division.id);
            })   
        };
        
        fetchNlStandingsData();
        },[]);

    React.useEffect(()=>{
        const fetchAlStandingsData = async () => {
            const response = await fetch("https://statsapi.mlb.com/api/v1/standings?leagueId=103");
            const data = await response.json();
            
            data.records.map((divisions, index)=>{
                if (divisions.division.id === 200) {    // AL West
                    setALWest(divisions.teamRecords);
                    localStorage.setItem("AL West", JSON.stringify(divisions));
                } else if (divisions.division.id === 201) { // AL East
                    setALEast(divisions.teamRecords);
                    localStorage.setItem("AL East", JSON.stringify(divisions));
                } else if (divisions.division.id === 202) { // AL Central
                    setALCentral(divisions.teamRecords);
                    localStorage.setItem("AL Central", JSON.stringify(divisions));
                }
                // console.log(divisions);
            })   
        };
        
        fetchAlStandingsData();
    },[]);
    
    

    return (
        <div className="dropdown">
            {alCentral.len === 0 ? console.log(""): 
                <div className="team-dd-container">
                {divisions.map((divisionObj, index) => {
                    const [divisionName, listOfTeams] = Object.entries(divisionObj)[0];
                    // console.log(listOfTeams);
                    return (
                    // <div className="team-dd-flex-item" key={index}>
                        <table className="team-dd-flex-item" key={index}>
                            <tbody>
                                <tr><td>{divisionName}</td></tr>
                                    {listOfTeams.map((teamObj, i) => {
                                        const teamWins = teamObj.leagueRecord.wins;
                                        const teamLosses = teamObj.leagueRecord.losses;
                                        const gamesBack = teamObj.divisionGamesBack;
                                        const teamName = teamIds[teamObj.team.id];
                                        return (
                                        <tr key={i}>
                                            <td>
                                                <CustomLink 
                                                teamName={teamName}
                                                color={teams[teamName].primaryColor}
                                                />
                                            </td>
                                            <td>
                                                <span>{teamWins}</span>
                                                <span>{teamLosses}</span>
                                                <span>{gamesBack}</span>
                                            </td>
                                        </tr>
                                    )})}
                                </tbody>
                        </table>
                    // </div>
                    );
                })}
            </div>
        }
        </div>
    );
}

export default DropdownStandings;
export {teamIds};