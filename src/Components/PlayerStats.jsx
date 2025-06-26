import React from "react";

function PlayerStats(props){
    if (props.stats.Position === "P") {
        return (
            <div className="overlay">
                <p>{props.stats.Name} <br /><span className="player-name">{props.stats.Position}</span></p>
                <p className="stat">Games: <span className="player-name">{props.stats.Games}</span></p>
                <p className="stat">IP: <span className="player-name">{props.stats.IP}</span></p>
                <p className="stat">ERA: <span className="player-name">{props.stats.ERA}</span></p>
                <p className="stat">WHIP: <span className="player-name">{props.stats.WHIP}</span></p>
                <p className="stat">Wins: <span className="player-name">{props.stats.Wins}</span></p>
                <p className="stat">Losses: <span className="player-name">{props.stats.Losses}</span></p>
                <p className="stat">Saves: <span className="player-name">{props.stats.Saves}</span></p>
                <p className="stat">SO: <span className="player-name">{props.stats.Strikeouts}</span></p>
                <p className="stat">BB: <span className="player-name">{props.stats.Walks}</span></p>
            </div>
        );
    } else {
        return (
            <div className="overlay">
                <p>{props.stats.Name} <br /><span className="player-name">{props.stats.Position}</span></p>
                <p className="stat">Games: <span className="player-name">{props.stats.Games}</span></p>
                <p className="stat">Plate Appearances: <span className="player-name">{props.stats.PA}</span></p>
                <p className="stat">Hits: <span className="player-name">{props.stats.Hits}</span></p>
                <p className="stat">Home Runs: <span className="player-name">{props.stats.HR}</span></p>
                <p className="stat">Runs: <span className="player-name">{props.stats.Runs}</span></p>
                <p className="stat">RBI: <span className="player-name">{props.stats.RBI}</span></p>
                <p className="stat">SB: <span className="player-name">{props.stats.SB}</span></p>
                <p className="stat">AVG: <span className="player-name">{props.stats.AVG}</span></p>
                <p className="stat">OBP: <span className="player-name">{props.stats.OBP}</span></p>
                <p className="stat">SLG: <span className="player-name">{props.stats.SLG}</span></p>
                <p className="stat">OPS: <span className="player-name">{props.stats.OPS}</span></p>
            </div>
        );
    }
    
    
}

export default PlayerStats;