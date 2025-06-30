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
    totalBases: number;
    doubles: number;
    triples: number;
    intentionalWalks: number;
    groundOutsToAirouts: string;
    gamesPitched: number;
    wins: number;
    losses: number;
    saves: number;
    saveOpportunities: number;
    blownSaves: number;
    era: string;
    whip: string;
    inningsPitched: string;
    completeGames: number;
    shutouts: number;
    earnedRuns: number;
    hitBatsmen: number;
    gamesStarted: number;
    holds: number;
    numberOfPitches: number;
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
        splits?: StatLine[];
    }[];
}

function PlayerPage(){
    const [dataCareer, setDataCareer] = React.useState<ApiResponse | null>(null);
    const [dataCurrent, setDataCurrent] = React.useState<ApiResponse | null>(null);
    const location = useLocation();
    const { playerInfo } = location.state;
    const { playerId } = useParams();
    // console.log(playerInfo);

    React.useEffect(()=>{
        async function fetchData(): Promise<void> {
            const group = playerInfo.primaryPosition.name === "Pitcher" ? "pitching": "hitting";
            try {
                const responseCareer = await fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=career&season=2025&group=${group}`);
                const careerData:ApiResponse = await responseCareer.json(); 
                const responseCurrent = await fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=yearByYear&season=2025&group=${group}`);
                const currentData:ApiResponse = await responseCurrent.json();
                setDataCareer(careerData);
                setDataCurrent(currentData); 
            } catch (e) {
                console.log("Error: " + e);
            }
            return;
        }
        fetchData();
    },[playerId]);
    
    if (!dataCareer) return <p>Loading...</p>
    if (!dataCurrent) return <p>Loading...</p>
    // const currentStats = dataCurrent?.stats?.[0]?.splits?.[0]?.stat;
    const careerStats = dataCareer?.stats?.[0]?.splits?.[0]?.stat;
    return (
        <div>            
            <div style={{display:"flex", gap:"10px"}}>
                <img 
                    style={{
                        width:"180px", 
                        height:"260px", 
                        border:"5px solid black",
                        margin:"5px 5px 0px 5px",
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
                        {dataCurrent?.stats?.[0]?.splits?.at(-1)?.team.name}
                    </p>
                    <p>
                        <span style={{fontSize:"1.145rem", fontWeight:"bold"}}>
                            Born:{' '} 
                        </span>
                        {playerInfo.birthDate} in {playerInfo.birthCity}{playerInfo.birthStateProvince && `, ${playerInfo.birthStateProvince}`}, {playerInfo.birthCountry}
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
            <div style={{ marginBottom:"50px"}}>
                <h1>Stats</h1>
                {playerInfo.primaryPosition.name === "Pitcher" ? 
                <table style={{borderCollapse: "collapse",width:"100%", textAlign:"center"}}>
                    <thead style={{backgroundColor:"darkblue", color:"white"}}>
                        <tr>
                            <th>Year</th>
                            <th>W</th><th>L</th><th>ERA</th><th>G</th>
                            <th>GS</th><th>CG</th><th>SHO</th><th>HLD</th>
                            <th>SV</th><th>SVO</th><th>IP</th><th>H</th>
                            <th>R</th><th>ER</th><th>HR</th><th>NP</th>
                            <th>HB</th><th>BB</th><th>IBB</th><th>SO</th>
                            <th>AVG</th><th>WHIP</th><th>GO/AO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCurrent.stats[0].splits?.map((year, index)=>{
                            return (
                                <tr key={index} style={{borderBottom:"2px solid gray"}}>
                                    <td style={{borderRight:"2px solid gray"}}>{year.season}</td>
                                    <td>{year.stat.wins}</td><td>{year.stat.losses}</td><td>{year.stat.era}</td><td>{year.stat.gamesPitched}</td>
                                    <td>{year.stat.gamesStarted}</td><td>{year.stat.completeGames}</td><td>{year.stat.shutouts}</td><td>{year.stat.holds}</td>
                                    <td>{year.stat.saves}</td><td>{year.stat.saveOpportunities}</td><td>{year.stat.inningsPitched}</td><td>{year.stat.hits}</td>
                                    <td>{year.stat.runs}</td><td>{year.stat.earnedRuns}</td><td>{year.stat.homeRuns}</td><td>{year.stat.numberOfPitches}</td>
                                    <td>{year.stat.hitBatsmen}</td><td>{year.stat.baseOnBalls}</td><td>{year.stat.intentionalWalks}</td><td>{year.stat.strikeOuts}</td>
                                    <td>{year.stat.avg}</td><td>{year.stat.whip}</td><td>{year.stat.groundOutsToAirouts}</td>
                                </tr>
                            )
                        })}
                        <tr style={{borderBottom:"2px solid gray"}}>
                            <td style={{borderRight:"2px solid gray"}}>Career</td>
                            <td>{careerStats?.wins}</td><td>{careerStats?.losses}</td><td>{careerStats?.era}</td><td>{careerStats?.gamesPitched}</td>
                            <td>{careerStats?.gamesStarted}</td><td>{careerStats?.completeGames}</td><td>{careerStats?.shutouts}</td><td>{careerStats?.holds}</td>
                            <td>{careerStats?.saves}</td><td>{careerStats?.saveOpportunities}</td><td>{careerStats?.inningsPitched}</td><td>{careerStats?.hits}</td>
                            <td>{careerStats?.runs}</td><td>{careerStats?.earnedRuns}</td><td>{careerStats?.homeRuns}</td><td>{careerStats?.numberOfPitches}</td>
                            <td>{careerStats?.hitBatsmen}</td><td>{careerStats?.baseOnBalls}</td><td>{careerStats?.intentionalWalks}</td><td>{careerStats?.strikeOuts}</td>
                            <td>{careerStats?.avg}</td><td>{careerStats?.whip}</td><td>{careerStats?.groundOutsToAirouts}</td>
                        </tr>
                    </tbody>
                </table>
                :
                <table style={{borderCollapse: "collapse",width:"100%", textAlign:"center"}}>
                    <thead style={{backgroundColor:"darkblue", color:"white"}}>
                        <tr>
                            <th>Year</th>
                            <th>G</th><th>AB</th><th>R</th><th>H</th>
                            <th>TB</th><th>2B</th><th>3B</th><th>HR</th>
                            <th>RBI</th><th>BB</th><th>IBB</th><th>SO</th>
                            <th>SB</th><th>CS</th><th>AVG</th><th>OBP</th>
                            <th>SLG</th><th>OPS</th><th>GO/FO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCurrent.stats[0].splits?.map((year, index)=>{
                            return (
                                <tr key={index} style={{borderBottom:"2px solid gray"}}>
                                    <td style={{borderRight:"2px solid gray"}}>{year.season}</td>
                                    <td>{year.stat.gamesPlayed}</td><td>{year.stat.atBats}</td><td>{year.stat.runs}</td><td>{year.stat.hits}</td>
                                    <td>{year.stat.totalBases}</td><td>{year.stat.doubles}</td><td>{year.stat.triples}</td><td>{year.stat.homeRuns}</td>
                                    <td>{year.stat.rbi}</td><td>{year.stat.baseOnBalls}</td><td>{year.stat.intentionalWalks}</td><td>{year.stat.strikeOuts}</td>
                                    <td>{year.stat.stolenBases}</td><td>{year.stat.caughtStealing}</td><td>{year.stat.avg}</td><td>{year.stat.obp}</td>
                                    <td>{year.stat.slg}</td><td>{year.stat.ops}</td><td>{year.stat.groundOutsToAirouts}</td>
                                </tr>
                            )
                        })}
                        <tr style={{borderBottom:"2px solid gray"}}>
                            <td style={{borderRight:"2px solid gray"}}>Career</td>
                            <td>{careerStats?.gamesPlayed}</td><td>{careerStats?.atBats}</td><td>{careerStats?.runs}</td><td>{careerStats?.hits}</td>
                            <td>{careerStats?.totalBases}</td><td>{careerStats?.doubles}</td><td>{careerStats?.triples}</td><td>{careerStats?.homeRuns}</td>
                            <td>{careerStats?.rbi}</td><td>{careerStats?.baseOnBalls}</td><td>{careerStats?.intentionalWalks}</td><td>{careerStats?.strikeOuts}</td>
                            <td>{careerStats?.stolenBases}</td><td>{careerStats?.caughtStealing}</td><td>{careerStats?.avg}</td><td>{careerStats?.obp}</td>
                            <td>{careerStats?.slg}</td><td>{careerStats?.ops}</td><td>{careerStats?.groundOutsToAirouts}</td>
                        </tr>
                    </tbody>
                </table>
                }
            </div>
        </div>
    );
}

export default PlayerPage;