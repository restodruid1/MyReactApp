import React from "react";

function TeamPlayerCard(props){
    const playerData = props.playerData;
    // console.log(playerData);
    const {person} = props.playerData;
    const {jerseyNumber} = props.playerData;
    const { position } = props.playerData;
    console.log(person,jerseyNumber,position);
    
    
    return (
        <div className="playercard">
            {/* Turn this into a player card with their image */}
            <img className="player-img" src={`https://content.mlb.com/images/headshots/current/60x60/${person.id}.png`}/>
            <p>{playerData.person.fullName}</p>
            <p>#{playerData.jerseyNumber}</p>
            {/* <p>{playerData.position.name}</p> */}
            
        </div>
    );
}

export default TeamPlayerCard;