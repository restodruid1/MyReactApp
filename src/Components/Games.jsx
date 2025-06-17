import React from "react";

function Games(props){
    const [nextGame, setNextGame] = React.useState([]);
    const {teamId} = props;
    
    React.useEffect(()=>{
        async function handleSchedule(){
            const today = new Date();
            const endDate = new Date();
            endDate.setDate(today.getDate() + 5);

            const startStr = today.toISOString().split("T")[0];
            const endStr = endDate.toISOString().split("T")[0];
            
            const response = await fetch(`https://statsapi.mlb.com/api/v1/schedule?teamId=${teamId}&sportId=1&startDate=${startStr}&endDate=${endStr}`);
            const data = await response.json();
            // console.log(data.dates);
            const {dates} = data;
            console.log("THIS WORKS");
            console.log(dates);
            setNextGame(dates);
        }
        handleSchedule();
    },[teamId]);
    
    return (
        <div>
            <h2>Upcoming Games</h2>
            {nextGame.map((date)=>{
                return (date.games.map((game)=>{
                    return (
                    <div>
                        <p>{game.teams.away.score}</p>
                        <p>{game.teams.home.score}</p>
                        <p>{game.status.statusCode}</p>
                        <p>{game.officialDate}</p>
                    </div>
                    )
                }))
            })}    
        </div>
    );
}

export default Games;