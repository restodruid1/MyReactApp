import React from "react";

function PlayerStats(props){
    return (
        <div className="overlay">
            <p>{props.stats.Name}</p>
            <p>Games: {props.stats.Games}</p>
            <p>Hits: {props.stats.Hits}</p>
            <p>Home Runs: {props.stats.HR}</p>
            <p>AVG: {props.stats.AVG}</p>
            <p>OBP: {props.stats.OBP}</p>
            <p>OPS: {props.stats.OPS}</p>
        </div>
    );
}

export default PlayerStats;