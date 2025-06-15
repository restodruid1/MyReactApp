import React, { act } from "react";
import { useParams } from "react-router-dom";
import { teams } from "./PlayerCard";
import TeamPlayerCard from "./TeamPlayerCard";
import "../styles/teamPage.css"

function TeamPage(){
    const [activeRoster, setActiveRoster] = React.useState([]);
    const [teamData, setTeamData] = React.useState([]);
    const { teamName } = useParams();
    const { teamId } = teams[teamName];
    const { league } = teams[teamName];
    console.log(teamId);
    console.log(teamName);
    console.log(league);
    const stripBlankUrl = teamName.replace(/\s+/g,"");
    const position = ["First Base", "Second Base", "shortstop", "Third Base", "Outfield", "Catcher", "Pitcher"];
    
    
    

    React.useEffect(()=>{
        const getTeamData = async()=>{
            // I need to match the team division to the cached division and find the team by team ID
            const cached = localStorage.getItem(league);
            if (cached) {
                const cachedDivisionData = JSON.parse(cached);
                const { teamRecords } = cachedDivisionData;
                teamRecords.map((teams,index)=>{
                    if (teams.team.id === teamId){
                        console.log("TEAM: " + teams.team.name);
                        console.log(teams.leagueRecord);
                        setTeamData([teams]);
                    }
                    // console.log(teams, index);
                })
            } else {
                console.log("Cached not available");
            }
        }
        getTeamData();
    },[teamName]);



    React.useEffect(()=>{
        const fetchRosterData = async()=>{
            const response = await fetch(`https://statsapi.mlb.com/api/v1/teams/${teamId}/roster`);
            const data = await response.json();
            console.log(data);
            const { roster } = data;
            console.log(roster);

            const catchers = [];
            const pitchers = [];
            const firstbase = [];
            const secondbase = [];
            const thirdbase = [];
            const shortstop = [];
            const outfield = [];

            roster.map((player)=>{
                if (player.position.name === "Catcher"){
                    catchers.push(player);
                } else if(player.position.name === "Pitcher"){
                    pitchers.push(player);
                } else if(player.position.name === "Outfielder"){
                    outfield.push(player);
                } else if(player.position.name === "Shortstop"){
                    shortstop.push(player);
                } else if(player.position.name === "First Base"){
                    firstbase.push(player);
                } else if(player.position.name === "Second Base"){
                    secondbase.push(player);
                } else if(player.position.name === "Third Base"){
                    thirdbase.push(player);
                }
            })
            setActiveRoster([firstbase, secondbase, shortstop, thirdbase, outfield, catchers, pitchers]);
        };
        fetchRosterData();
    },[teamName]);
    
    return (
        <div>
            <div className="teamInfo-container">
                <img className="team-logo" src={`/TeamLogos/${stripBlankUrl}.svg`} />
                {!teamData.length > 0 ? console.log("No Team Data") : 
                (()=>{
                    const teamInfo =  teamData[0];
                    const {team} = teamInfo;
                    const {leagueRecord} = teamInfo;
                    return (
                        <div >
                            <h1>{team.name}</h1>
                            <p>Wins: {leagueRecord.wins}</p>
                            <p>Losses: {leagueRecord.losses}</p>
                            <p>PCT: {leagueRecord.pct}</p>
                            <p>GB: {teamInfo.gamesBack}</p>
                            <p>WCGB: {teamInfo.wildCardGamesBack}</p>
                        </div>
                    )
                })()
            
                }
            </div>
            <h1>Active ROSTER</h1>
            <div className="team-flex-container" style={{border: `5px solid ${teams[teamName].primaryColor}`}}>
                {activeRoster.map((positionArr, index)=>{
                    return (
                        <div className="playerposition-container" key={index}>
                            <h4>{position[index]}</h4>    
                            {positionArr.map((player,index)=>{
                                return (
                                    <TeamPlayerCard 
                                    key={index}
                                    playerData={player}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
                {/* {activeRoster.length > 0 ? <p>{activeRoster[0].person.fullName}</p> : <p>hello</p>} */}
            </div>
        </div>
    );
}
// https://www.mlbstatic.com/team-logos/team-cap-on-light/109.svg
export default TeamPage;