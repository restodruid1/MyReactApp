import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function PlayerPage(){
    const location = useLocation();
    const { playerInfo } = location.state;
    const { playerId } = useParams();
    console.log(playerInfo);


    return (
        <div>            
            <div style={{display:"flex", gap:"10px"}}>
                <img style={{width:"180px", height:"260px"}} src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${playerId}/headshot/67/current`}/>
                <p>{playerId}</p>
            </div>
        </div>
    );
}

export default PlayerPage;