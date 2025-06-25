import React from "react";
import { teamIds } from "./DropdownStandings";

function OneGame(props){
    const [currentGameData, setLiveData] = React.useState(null);
    const [outsInInning, setOutsInInning] = React.useState(0);
    const [bases, setBases] = React.useState({
        first:false,
        second:false,
        third:false,
    });

    React.useEffect(()=>{
        async function getGameData(){
            const { liveGameData } = props;
            const liveLink = "https://statsapi.mlb.com" + liveGameData.link;
            const response = await fetch(liveLink);
            const data = await response.json();
            // console.log(data);
            setLiveData(data);
            
            const { outs } = data.liveData.linescore;
            const { offense } = data.liveData.linescore;
            setOutsInInning(outs);
            setBases((prev)=>({
                ...prev,
                first: !!offense.first,
                second: !!offense.second,
                third: !!offense.third,
            }));    
        }
        
        getGameData();

        //Set Interval to fetch live data
        const interval = setInterval(getGameData, 15000);
        return () => clearInterval(interval);
    },[props]);

    if (!currentGameData) {
        return <p>Loading...</p>;
    }

    const awayTeamId = currentGameData.gameData.teams.away.id;
    const awayTeamAbbr = currentGameData.gameData.teams.away.abbreviation;
    const awayRuns = currentGameData.liveData.linescore.teams.away.runs;
    const awayTeamName = teamIds[awayTeamId].replace(/\s+/g,"");
    const homeTeamId = currentGameData.gameData.teams.home.id;
    const homeTeamName = teamIds[homeTeamId].replace(/\s+/g,"");
    const homeTeamAbbr = currentGameData.gameData.teams.home.abbreviation;
    const homeRuns = currentGameData.liveData.linescore.teams.home.runs;
    const currentInning = currentGameData.liveData.linescore.currentInningOrdinal;
    console.log(currentGameData);
    
    return (
        <div style={{display:"flex", border:"2px solid grey", borderRadius:"10px", marginLeft:"10px", minWidth:"190px", alignItems:"end"}}>
            <div style={{display:"flex",flexDirection:"column", flex:"1 1 48%", fontSize:"small"}}>
                <p style={{margin:"0 0 0 2px", color:"grey"}}>
                    {currentGameData.gameData.status.detailedState === "Warmup" ? 
                    ("Warmup")
                    : 
                    (currentGameData.liveData.linescore.isTopInning ? `Top ${currentInning}` :`Bot ${currentInning}`)}
                </p>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <img src={`/TeamLogos/${awayTeamName}.svg`} alt="team logo" style={{height:"20px", width:"20px",alignSelf:"center"}}/>
                    <p>{awayTeamAbbr}</p>
                    <p>{awayRuns}</p>
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <img src={`/TeamLogos/${homeTeamName}.svg`} alt="team logo" style={{height:"20px", width:"20px",alignSelf:"center"}}/>
                    <p style={{alignSelf:"center"}}>{homeTeamAbbr}</p>
                    <p>{homeRuns}</p>
                </div>
            </div>
            <div style={{flex:"1 1 48%", alignSelf:"end"}}>
                <svg width="100" height="100" >
                    {bases.first ? <rect x="65" y="45" width="10" height="10" fill="black" transform="rotate(45,70,50)"/>:<rect x="65" y="45" width="10" height="10" stroke="black" fill="white" transform="rotate(45,70,50)"/>}
                    {bases.second ? <rect x="45" y="15" width="10" height="10" fill="black" transform="rotate(45,50,20)" /> : <rect x="45" y="15" width="10" height="10" stroke="black" fill="white" transform="rotate(45,50,20)" />}
                    {bases.third ? <rect x="25" y="45" width="10" height="10" fill="black" transform="rotate(45,30,50)" /> : <rect x="25" y="45" width="10" height="10" stroke="black" fill="white" transform="rotate(45,30,50)" />}
                    {[0,1,2].map((out, index)=>{
                        return (
                        <circle
                        key={index} 
                        cx={`${38 + out * 10}`} 
                        cy="80" 
                        r="4"
                        stroke="black" 
                        fill={out < outsInInning ? "red" : "grey"}/>
                        )
                    })}
                </svg>
            </div>
        </div>
    );
}

export default OneGame;