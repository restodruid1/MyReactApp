import React from "react";
import { useParams } from "react-router-dom";
import { teams } from "./PlayerCard";

function TeamPage(){
    const { teamName } = useParams();
    console.log(teamName);
    const stripBlankUrl = teamName.replace(/\s+/g,"");
    return (
        <div>
            <img src={`/TeamLogos/${stripBlankUrl}.svg`} />
            <p>{teamName}</p>
        </div>
    );
}
// https://www.mlbstatic.com/team-logos/team-cap-on-light/109.svg
export default TeamPage;