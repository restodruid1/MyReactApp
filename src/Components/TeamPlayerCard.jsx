import React from "react";

function TeamPlayerCard(props){
    const playerData = props.playerData;
    // console.log(playerData);
    const {person} = props.playerData;
    const {jerseyNumber} = props.playerData;
    const { position } = props.playerData;
    // console.log(person,jerseyNumber,position);
    
    
    return (
        <div className="playercard">
            <img className="player-img" alt="Player" src={`https://content.mlb.com/images/headshots/current/60x60/${person.id}.png`}/>
            <p>{playerData.person.fullName}</p>
            <p><span>{position.abbreviation}/#{jerseyNumber}</span></p>
        </div>
    );
}

export default TeamPlayerCard;