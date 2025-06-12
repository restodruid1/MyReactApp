import React from "react"; 
import { Link } from "react-router-dom";
import { teams } from "./PlayerCard";

function DropdownTeams(props){
    // const teamIds = Object.keys(teams);
    // console.log(teamIds);
    const [nlWest, setNLWest] = React.useState([]);
    const [alWest, setALWest] = React.useState([]);
    const [nlEast, setNLEast] = React.useState([]);
    const [alEast, setALEast] = React.useState([]);
    const [nlCentral, setNLCentral] = React.useState([]);
    const [alCentral, setALCentral] = React.useState([]);
    const [divState, setDivState] = React.useState([]);
    // const divisions = [
    //     {"NL West": ["D-backs","Dodgers","Giants","Padres","Rockies"]},
    //     {"AL West": ["Angels","Astros","Athletics","Mariners","Rangers"]},
    //     {"NL East": ["Braves","Marlins","Mets","Nationals","Phillies"]},
    //     {"AL East": ["Blue Jays","Orioles","Rays","Red Sox","Yankees"]},
    //     {"NL Central": ["Brewers","Cardinals","Cubs","Pirates","Reds"]},
    //     {"AL Central": ["Guardians","Royals","Tigers","Twins","White Sox"]},
    // ]
    const divisions = [
        {"NL West": nlWest},
        {"AL West": alWest},
        {"NL East": nlEast},
        {"AL East": alEast},
        {"NL Central": nlCentral},
        {"AL Central": alCentral},
    ]
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
    }

    React.useEffect(()=>{
        const fetchNlStandingsData = async () => {
            const response = await fetch("https://statsapi.mlb.com/api/v1/standings?leagueId=104");
            const data = await response.json();
            // console.log(data); 
            data.records.map((divisions, index)=>{
                // console.log(divisions[index]);                
                if (divisions.division.id === 203) {    // NL West
                    setNLWest(divisions.teamRecords);
                    setDivState([...divState, nlWest]);
                } else if (divisions.division.id === 204) {
                    setNLEast(divisions.teamRecords);
                    setDivState([...divState, nlEast]);
                } else if (divisions.division.id === 205) {
                    setNLCentral(divisions.teamRecords);
                    setDivState([...divState, nlCentral]);
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
            // console.log(data); 
            data.records.map((divisions, index)=>{
                if (divisions.division.id === 200) {    // AL West
                    setALWest(divisions.teamRecords);
                    setDivState([...divState, alWest]);
                } else if (divisions.division.id === 201) {
                    setALEast(divisions.teamRecords);
                    setDivState([...divState, alEast]);
                } else if (divisions.division.id === 202) {
                    setALCentral(divisions.teamRecords);
                    setDivState([...divState, alCentral]);
                }
                // console.log(divisions);
            })   
        };
        
        fetchAlStandingsData();
    },[]);
    
    return (
        <div className="dropdown">
            {alCentral.len === 0 ? console.log("nope"): 
             <div className="team-dd-container">
                {divisions.map((divisionObj, index) => {
                    const [divisionName, teams] = Object.entries(divisionObj)[0];
                    // console.log(teams);
                    return (
                    // <div className="team-dd-flex-item" key={index}>
                        <table className="team-dd-flex-item" key={index}>
                            <tbody>
                                <tr><td>{divisionName}</td></tr>
                                    {teams.map((teamObj, i) => {
                                        const teamWins = teamObj.leagueRecord.wins;
                                        const teamLosses = teamObj.leagueRecord.losses;
                                        const gamesBack = teamObj.divisionGamesBack;
                                        return (
                                        <tr key={i}>
                                            <td>
                                                <Link to={`/team/${teamIds[teamObj.team.id]}`}>{teamIds[teamObj.team.id]}</Link>
                                            </td>
                                            {props.standings ? 
                                                <td>
                                                    <span>{teamWins}</span>
                                                    <span>{teamLosses}</span>
                                                    <span>{gamesBack}</span>
                                                </td>
                                                : 
                                                <td></td>
                                            }
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

export default DropdownTeams;