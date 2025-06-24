import React from "react";
import { teamIds } from "./DropdownStandings";

function OneGame(props){
    const [currentGameData, setLiveData] = React.useState(null);

    React.useEffect(()=>{
        async function getGameData(){
            const { liveGameData } = props;
            const liveLink = "https://statsapi.mlb.com" + liveGameData.link;
            const response = await fetch(liveLink);
            const data = await response.json();
            console.log(data);
            setLiveData(data);
        }
        getGameData();

        //Set Interval to fetch live data
        const interval = setInterval(getGameData, 15000);
        return () => clearInterval(interval);
    },[]);

    if (!currentGameData) {
        return <p>Loading...</p>;
    }

    const awayTeamId = currentGameData.gameData.teams.away.id;
    const awayTeamAbbr = currentGameData.gameData.teams.away.abbreviation;
    const awayRuns = currentGameData.liveData.linescore.teams.away.runs;
    const homeTeamId = currentGameData.gameData.teams.home.id;
    const homeTeamAbbr = currentGameData.gameData.teams.home.abbreviation;
    const homeRuns = currentGameData.liveData.linescore.teams.home.runs;
    const currentInning = currentGameData.liveData.linescore.currentInningOrdinal;
    // console.log(currentGameData.liveData.plays.currentPlay.runnerIndex);
    return (
        <div style={{display:"flex", border:"2px solid grey", borderRadius:"10px", marginLeft:"10px", minWidth:"190px"}}>
            <div style={{display:"flex",flexDirection:"column", flex:"1 1 48%"}}>
                <p>{currentGameData.liveData.linescore.isTopInning ? `Top ${currentInning}` :`Bot ${currentInning}`}</p>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <img src={`/TeamLogos/${teamIds[awayTeamId]}.svg`} style={{height:"20px", width:"20px",alignSelf:"center"}}/>
                    <p>{awayTeamAbbr}</p>
                    <p>{awayRuns}</p>
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <img src={`/TeamLogos/${teamIds[homeTeamId]}.svg`} style={{height:"20px", width:"20px",alignSelf:"center"}}/>
                    <p style={{alignSelf:"center"}}>{homeTeamAbbr}</p>
                    <p>{homeRuns}</p>
                </div>
            </div>
            <div style={{flex:"1 1 48%", alignSelf:"center"}}>
                <svg width="100" height="100" style={{backgroundColor:"#bff"}}>
                    <rect x="70" y="45" width="10" height="10" transform="rotate(45,75,50)"/>
                    <rect x="45" y="10" width="10" height="10" transform="rotate(45,50,15)" />
                    <rect x="20" y="45" width="10" height="10" transform="rotate(45,25,50)" />
                    <circle cx="30" cy="90" r="4" fill="red"/>
                    <circle cx="40" cy="90" r="4" fill="red"/>
                    <circle cx="50" cy="90" r="4" fill="red"/>
                </svg>
            </div>
        </div>
    );
}

export default OneGame;