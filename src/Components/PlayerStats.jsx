import React from "react";

function PlayerStats(props){
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
            <p className="stat">OPS: <span className="player-name">{props.stats.OPS}</span></p>
        </div>
    );
}

export default PlayerStats;