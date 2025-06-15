import React from "react";

function TeamPlayerCard(props){
    const playerData = props.playerData;
    
    return (
        <div className="playercard-container">
            {/* Turn this into a player card with their image */}
            <p>{playerData.person.fullName}</p>
            <p>#{playerData.jerseyNumber}</p>
            {/* <p>{playerData.position.name}</p> */}
            
        </div>
    );
}

export default TeamPlayerCard;