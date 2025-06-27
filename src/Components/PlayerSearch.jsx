import React from "react";
import { Link } from "react-router-dom";

function PlayerSearch(){
    const [searchedPlayers, setSearchedPlayers] = React.useState([]);
    const [isSearching, setIsSearching] = React.useState(false);

    async function handleText(event){
        console.log("EVENT: "+ event.target.value);
        const value = event.target.value;
        if (value.length >= 2 && value.length < 25) {
            const response = await fetch(`https://statsapi.mlb.com/api/v1/people/search?names=${value}`);
            const data = await response.json();
            // console.log(data);
            const players = data.people.filter((player)=>player.mlbDebutDate && player.active);
            // console.log(players);
            setSearchedPlayers(players.slice(0,5));
            setIsSearching(true);
        } else {
            setIsSearching(false);
            // setSearchedPlayers([]);
        }
    }
    
    return (
        <div style={{position:"relative"}}>
            <input onChange={handleText} required type="search" placeholder="Player Search"/>
            {isSearching && <div style={{position:"absolute", backgroundColor:"grey", width:"100%", zIndex:"5"}}>
                {searchedPlayers.map((player, index)=>{
                    return (
                        <Link
                        key={index} 
                        to={`/player/${player.useName}+${player.useLastName}/id/${player.id}`} 
                        state={{playerInfo:player}}
                        style={{textDecoration:"none", color:"black"}}
                        >
                            <p className="filterStats" onClick={()=>setIsSearching(false)}>
                                <img alt="Player" style={{width:"30px", height:"30px", marginRight:"5px"}}src={`https://content.mlb.com/images/headshots/current/60x60/${player.id}.png`}/>
                                {player.fullName}
                            </p>
                        </Link>
                    )
                })} 
                </div>}
        </div>
    );
}

export default PlayerSearch;