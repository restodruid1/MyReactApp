import logo from './logo.svg';
import './App.css';
import React from "react";
import PlayerCard from './Components/PlayerCard';

function App() {
  const [players, setPlayers] = React.useState([]);
  
  React.useEffect(()=>{
    async function getMLBPlayerStats() {
      const params = {
        stats:"season",
        group:"hitting",
        gameType:"R",
        limit:"50",
        sortStat:"homeruns",
        playerPool:"qualified"
      }
      const url = `https://statsapi.mlb.com/api/v1/stats?stats=${params.stats}&group=${params.group}&season=2025&gameType=${params.gameType}&limit=${params.limit}&sortStat=${params.sortStat}&playerPool=${params.playerPool}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        
        const playersData = data.stats[0].splits; 
        const results = playersData.map(player => {
          const stat = player.stat;
          const info = player.player;
  
          return {
            Name: info.fullName,
            Team: player.team.name || "N/A",
            Games: stat.gamesPlayed,
            AB: stat.atBats,
            Hits: stat.hits,
            HR: stat.homeRuns,
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
    <div className="App">
      {players.length ? players.map((player, index)=>{
        return (
        <PlayerCard
          key={index}
          name={player.Name}
          hr={player.HR}
        />);
      }) :
      <p>"hello world"</p>}
    </div>
  );
}

export default App;
