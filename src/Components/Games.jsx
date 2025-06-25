import React from "react";
import { teamIds } from "./DropdownStandings";
// import { teams } from "./PlayerCard";

function Games(props){
    const [nextGame, setNextGame] = React.useState([]);
    const {teamId} = props;
    
    React.useEffect(()=>{
        async function handleSchedule(){
            const now = new Date();
            now.setDate(now.getDate() - 1);
            const plus5 = new Date(now);
            plus5.setDate(plus5.getDate() + 5);
            const options = {
            timeZone: "America/New_York",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
            };
            const estDate = new Intl.DateTimeFormat("en-US", options).formatToParts(now);
            const estDatePlus5 = new Intl.DateTimeFormat("en-US", options).formatToParts(plus5);

            let year, month, day;
            
            estDate.forEach(({ type, value }) => {
                if (type === "year") year = value;
                if (type === "month") month = value;
                if (type === "day") day = value;
            });
            const startDate = `${year}-${month}-${day}`;
            console.log("STARTDATE: " + startDate);
            estDatePlus5.forEach(({ type, value }) => {
                if (type === "year") year = value;
                if (type === "month") month = value;
                if (type === "day") day = value;
            });
            const endDate = `${year}-${month}-${day}`;
            
            const response = await fetch(`https://statsapi.mlb.com/api/v1/schedule?teamId=${teamId}&sportId=1&startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();
            // console.log(data.dates);
            const {dates} = data;
            // console.log(dates);
            setNextGame(dates);
        }
        handleSchedule();
    },[teamId]);
    
    return (
        <div style={{display:"flex",  justifyContent:"space-between", flexWrap:"wrap"}}>
            {/* <h2 style={{border:"1px solid black"}}>Upcoming Games</h2> */}
            {nextGame.map((date)=>{
                return (date.games.map((game, index)=>{
                    // console.log(game);
                    // const homeTeam = game.teams.home.team.id === teamId ? true : false;
                    const {home} = game.teams;
                    const {away} = game.teams;
                    const utcDate = new Date(game.gameDate);
                    const options = {
                        timeZone: "America/New_York",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                        timeZoneName: "short"
                        };

                    let estString = new Intl.DateTimeFormat("en-US", options).format(utcDate);
                    // console.log(estString);
                    const splitDateStr = estString.split(",").map(s => s.trim());
                    const date = splitDateStr[0].slice(0,-5);
                    const time = splitDateStr[1].slice(0,4) + splitDateStr[1].slice(7);
                    let opposingTeamName = home.team.id === teamId ? teamIds[away.team.id] : teamIds[home.team.id]; 
                    opposingTeamName = opposingTeamName.replace(/\s+/g,"");

                    return (
                    <div key={index} style={{border:"1px solid black" ,flex:"1"}}>
                        {game.status.statusCode === "F" || game.status.statusCode === "I"? 
                        <div style={{flex:"1"}}>
                            {game.status.statusCode === "F"? <p style={{textAlign:"center"}}>FINAL {date}</p> : <p style={{textAlign:"center",color:"red"}}>LIVE {date}</p>}    
                            <div style={{display:"flex"}}>
                                <p style={{flex:"1 1 48%", textAlign:"center"}}>{teamIds[away.team.id]} {away.score}</p>
                                <p style={{flex:"1 1 48%", textAlign:"center"}}>{teamIds[home.team.id]} {home.score}</p>
                            </div>
                        </div>
                        :
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <img style={{width:"30px", height:"30px", objectFit:"contain"}} alt="Team Logo" src={`/TeamLogos/${opposingTeamName}.svg`}/>
                            <p>
                                <span>{date} {home.team.id === teamId ? <span>vs. {teamIds[away.team.id]}</span>: <span>@ {teamIds[home.team.id]}</span>}</span>
                                <br />
                                <span>{time}</span>
                            </p>
                        </div>
                        }
                    </div>
                    )
                }))
            })}    
        </div>
    );
}

export default Games;