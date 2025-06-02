import React from "react";

function PlayerCard(props) {
    return (
    <div className="player-card">
        <p>{props.name}</p>
        <p>{props.hr}</p>
    </div>
    )
}

export default PlayerCard;