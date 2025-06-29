import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';


interface PlayerStats {
    gamesPlayed: number;
    runs: number;
    homeRuns: number;
    strikeOuts: number;
    baseOnBalls: number;
    hits: number;
    avg: string;
    atBats: number;
    obp: string;
    slg: string;
    ops: string;
    stolenBases: number;
    caughtStealing:number;
    rbi: number;
    sacFlies: number;
    babip: string;
}
interface StatLine {
  season: string;
  stat: PlayerStats;
  team: {
    name: string;
  };
}
interface ApiResponse {
    stats: {
        splits: StatLine[];
    }[];
}

function PlayerPage(){
    const [dataCareer, setDataCareer] = React.useState<ApiResponse | null>(null);
    const [dataCurrent, setDataCurrent] = React.useState<ApiResponse | null>(null);
    const location = useLocation();
    const { playerInfo } = location.state;
    const { playerId } = useParams();
    console.log(playerInfo);

    React.useEffect(()=>{
        async function fetchData(): Promise<void> {
            const group = playerInfo.primaryPosition === "Pitcher" ? "pitching": "hitting";
            try {
                const responseCareer = await fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=career&season=2025&group=${group}`);
                const careerData:ApiResponse = await responseCareer.json(); 
                const responseCurrent = await fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&season=2025&group=${group}`);
                const currentData:ApiResponse = await responseCurrent.json();
                setDataCareer(careerData);
                setDataCurrent(currentData); 
            } catch (e) {
                console.log("Error: " + e);
            }
            return;
        }
        fetchData();
    },[]);
    
    if (!dataCareer) return <p>Loading...</p>
    return (
        <div>            
            <div style={{display:"flex", gap:"10px"}}>
                <img 
                    style={{
                        width:"180px", 
                        height:"260px", 
                        border:"5px solid black",
                        margin:"5px 0px 0px 5px",
                    }} 
                    src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${playerId}/headshot/67/current`}
                />
                <div>
                    <p style={{fontSize:"2em", fontWeight:"bold", marginBottom:"8px", marginTop:"8px"}}>
                        {playerInfo.fullName}{' '} 
                        #{playerInfo.primaryNumber}{' '}
                    </p>
                    <p style={{fontSize:"1.145rem", fontWeight:"bold"}}>
                        {playerInfo.primaryPosition.abbreviation}{' '}
                        |{' '}B/T:{' '}{playerInfo.batSide.code}/{playerInfo.pitchHand.code}{' '}
                        |{' '}{playerInfo.height}/{playerInfo.weight}{' '}
                        |{' '}Age:{' '}{playerInfo.currentAge}
                    </p>
                    <p>
                        <span style={{fontSize:"1.145rem", fontWeight:"bold"}}>
                            Team:{' '} 
                        </span>
                        {dataCurrent?.stats[0].splits[0].team.name}
                    </p>
                    <p>
                        <span style={{fontSize:"1.145rem", fontWeight:"bold"}}>
                            Born:{' '} 
                        </span>
                        {playerInfo.birthDate} in {playerInfo.birthCity}, {playerInfo.birthCountry}
                    </p>
                    <p>
                        <span style={{fontSize:"1.145rem", fontWeight:"bold"}}>
                            Pronunciation:{' '}
                        </span>
                        {playerInfo.pronunciation || "NA"}
                    </p>
                    <p>
                        <span style={{fontSize:"1.145rem", fontWeight:"bold"}}>
                            Debut:{' '}
                        </span>
                        {playerInfo.mlbDebutDate}
                    </p>
                    <p>
                        <span style={{fontSize:"1.145rem", fontWeight:"bold"}}>
                            Nickname:{' '}
                        </span>
                        {playerInfo.nickName || "NA"}
                    </p>
                </div>
            </div>
            <div>
                <h1>Stats</h1>
            </div>
        </div>
    );
}

export default PlayerPage;