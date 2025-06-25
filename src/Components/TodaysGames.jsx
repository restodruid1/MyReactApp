import React from "react";
import OneGame from "./OneGame";
import { teamIds } from "./DropdownStandings";

function TodaysGames(){
    const [todaysGames, setTodaysGames] = React.useState([]);

    React.useEffect(()=>{
        async function getGames(){
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
            const day = String(date.getDate()).padStart(2, '0');

            const todaysDate = `${year}-${month}-${day}`;
            try {
                const response = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${todaysDate}&endDate=${todaysDate}`);
                const data = await response.json();
                // console.log(data);
                const { games } = data.dates[0];
                console.log(games);
                setTodaysGames(games);
            } catch (e) {
                console.log(e);
            }
            
        }
        getGames();
        const interval = setInterval(getGames, 150000); 

        return () => clearInterval(interval); // clean up on unmount

    },[]);

    

    if (todaysGames.length === 0) {
        return;
    }

    return (
        <div style={{display:"flex",justifyContent:"flex-start", marginTop:"5px",alignItems:"stretch",gap:"10px",flexWrap:"wrap"}}>
            {todaysGames.map((game, index)=>{
                const {abstractGameCode} = game.status;
                const awayTeamName = teamIds[game.teams.away.team.id].replace(/\s+/g,"");
                const homeTeamName = teamIds[game.teams.home.team.id].replace(/\s+/g,"");
                const utcDate = new Date(game.gameDate);
                const options = {
                timeZone: "America/New_York",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                };
                const formattedGameTime = utcDate.toLocaleString("en-US", options);

                if (abstractGameCode === "P") { //Game is in Preview
                    return (
                        <div key={index} style={{minWidth:"190px",marginLeft:"10px",fontSize: "small", borderRadius:"10px", border:"2px solid grey"}}>
                            <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                <p style={{marginBottom:"0", marginLeft:"2px",color:"darkGrey"}}>
                                    {formattedGameTime} ET
                                </p>
                                <div style={{display:"flex"}}>
                                    <img style={{width:"20px", height:"20px",alignSelf:"center"}} alt="Team Logo" src={`/teamLogos/${awayTeamName}.svg`}/>
                                    <p>
                                        {game.teams.away.team.name} 
                                        <span style={{color:"grey", fontSize:"small", marginLeft:"5px"}}>{game.teams.away.leagueRecord.wins}-{game.teams.away.leagueRecord.losses}</span>
                                    </p>
                                </div>
                                <div style={{display:"flex"}}>
                                    <img style={{width:"20px", height:"20px",alignSelf:"center"}} alt="Team Logo" src={`/teamLogos/${homeTeamName}.svg`}/>
                                    <p>
                                        {game.teams.home.team.name}
                                        <span style={{color:"grey", fontSize:"small", marginLeft:"5px"}}>{game.teams.home.leagueRecord.wins}-{game.teams.home.leagueRecord.losses}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                } else if (abstractGameCode === "L") {  //Game is live
                    return <OneGame key={index} style={{flex:"1"}} liveGameData={game}/>
                } else {    //Game is final or suspended
                    return (    
                        <div key={index} style={{borderRadius:"10px",border:"2px solid grey",minWidth:"190px",marginLeft:"10px"}}>
                            <p>Final</p>
                            <p><img style={{width:"20px", height:"20px"}} alt="Team Logo" src={`/teamLogos/${awayTeamName}.svg`}/>
                                {game.teams.away.team.name} {game.teams.away.score}
                            </p>
                            <p><img style={{width:"20px", height:"20px"}} alt="Team Logo" src={`/teamLogos/${homeTeamName}.svg`}/>
                                {game.teams.home.team.name} {game.teams.home.score}
                            </p>
                        </div>
                    )
                }
                
            })}
        </div>
    );
}

export default TodaysGames;