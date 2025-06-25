import React from "react";
import PlayerCard from "./PlayerCard";
import { useLocation } from 'react-router-dom';
// import NavBar from "./NavBar";

function GetCards(props){
    const [players, setPlayers] = React.useState([]);
    const location = useLocation();
    const { year } = location.state || {};

    React.useEffect(()=>{
      async function getMLBPlayerStats() {
        const params = {
          stats:"season",
          group:"hitting",
          season: year || "2025",
          gameType:"R",
          limit: props.limit || "50",
          sortStat: props.sortByStat ||"OPS",
          playerPool: props.playerPool || "qualified"
        }
        const url = `https://statsapi.mlb.com/api/v1/stats?stats=${params.stats}&group=${params.group}&season=${params.season}&gameType=${params.gameType}&limit=${params.limit}&sortStat=${params.sortStat}&playerPool=${params.playerPool}`;
    
        try {
          const response = await fetch(url);
          const data = await response.json();
          // console.log(data);
          
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
    },[location.state]); //Reruns when navbar url gets clicked
    
    
    
    return (
    <div>
      {!location.state ? <p></p> : <h1>Sorted by {props.sortByStat ? props.sortByStat : "OPS"}</h1>}
        <ol className="App">
        {players.length ? players.map((player, index)=>{
            return (
            <li key={index}>
                <PlayerCard
                key={index}
                rank={index}
                playerId={player.PlayerId}
                teamId={player.TeamId}
                name={player.Name}
                position={player.Position}
                stats={player}
                />
            </li>
            );
        }) :
        <p></p>}
        </ol>
    </div>
    );
}


export default GetCards;