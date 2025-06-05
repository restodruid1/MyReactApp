import React from "react";
import PlayerCard from "./PlayerCard";
function GetCards(){
    const [players, setPlayers] = React.useState([]);
      
      React.useEffect(()=>{
        async function getMLBPlayerStats() {
          const test = await fetch("https://statsapi.mlb.com/api/v1/teams/");
          const moreData = await test.json();
          console.log(moreData);
          
          const params = {
            stats:"season",
            group:"hitting",
            gameType:"R",
            limit:"100",
            sortStat:"homeruns",
            playerPool:"qualified"
          }
          const url = `https://statsapi.mlb.com/api/v1/stats?stats=${params.stats}&group=${params.group}&season=2025&gameType=${params.gameType}&limit=${params.limit}&sortStat=${params.sortStat}&playerPool=${params.playerPool}`;
      
          try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            
            const playersData = data.stats[0].splits; 
            const results = playersData.map(player => {
              const stat = player.stat;
              const info = player.player;
              const team = player.team;
              const position = player.position;
      
              return {
                Name: info.fullName,
                PlayerId: info.id,
                TeamId: team.id,
                Team: team.name || "N/A",
                Position: position.abbreviation,
                Games: stat.gamesPlayed,
                PA: stat.plateAppearances,
                Hits: stat.hits,
                HR: stat.homeRuns,
                Runs: stat.runs,
                AVG: stat.avg,
                OBP: stat.obp,
                OPS: stat.ops,
                RBI: stat.rbi,
                SB: stat.stolenBases
              }});
          setPlayers(results);
      
          } catch (err) {
            console.error("Error fetching MLB data:", err);
            document.getElementById("output").textContent = "Failed to load stats.";
          }
        }
        getMLBPlayerStats();
      },[]);
    
    
    
    return (
    <div>
        <ol className="App">
        {players.length ? players.map((player, index)=>{
            return (
            <li>
                <PlayerCard
                key={index}
                rank={index}
                playerId={player.PlayerId}
                teamId={player.TeamId}
                name={player.Name}
                stats={player}
                />
            </li>
            );
        }) :
        <p></p>}
        </ol>
        <a href="/">HOME</a>
    </div>
    );
}


export default GetCards;