import React from "react";
import PlayerStats from "./PlayerStats";

const teams = {
    "Angels":  {teamId:108, logoImg: "url(/TeamLogos/Angels.svg)", primaryColor:"#003263", secondaryColor:"#ba0021" },
    "D-backs": {teamId:109, logoImg: "url(/TeamLogos/D-backs.svg)",  primaryColor:"#aa182c", secondaryColor:"#000000" },
    "Orioles": {teamId:110, logoImg: "url(/TeamLogos/Orioles.svg)", primaryColor:"#df4601", secondaryColor:"#000000" },
    "Red Sox": {teamId:111, logoImg: "url(/TeamLogos/RedSox.svg)", primaryColor:"#bd3039", secondaryColor:"#0d2b56" },
    "Cubs":    {teamId:112, logoImg: "url(/TeamLogos/Cubs.svg)", primaryColor:"#cc3433", secondaryColor:"#0e3386" },
    "Reds":    {teamId:113, logoImg: "url(/TeamLogos/Reds.svg)", primaryColor:"#c6011f", secondaryColor:"#ffffff" },
    "Guardians": {teamId:114, logoImg: "url(/TeamLogos/Guardians.svg)", primaryColor:"#002b5c", secondaryColor:"#e31937" },
    "Rockies": {teamId:115, logoImg: "url(/TeamLogos/Rockies.svg)", primaryColor:"#000000", secondaryColor:"#333367" },
    "Tigers":  {teamId:116, logoImg: "url(/TeamLogos/Tigers.svg)", primaryColor:"#0c2c56", secondaryColor:"#ffffff" },
    "Astros":  {teamId:117, logoImg: "url(/TeamLogos/Astros.svg)", primaryColor:"#002d62", secondaryColor:"#eb6e1f" },
    "Royals":  {teamId:118, logoImg: "url(/TeamLogos/Royals.svg)",  primaryColor:"#004687", secondaryColor:"#ffffff" },
    "Dodgers": {teamId:119, logoImg: "url(/TeamLogos/Dodgers.svg)", primaryColor:"#005a9c", secondaryColor:"#ffffff" },
    "Nationals": {teamId:120, logoImg: "url(/TeamLogos/Nationals.svg)", primaryColor:"#ab0003", secondaryColor:"#ffffff" },
    "Mets": {teamId:121, logoImg: "url(/TeamLogos/Mets.svg)", primaryColor:"#ff5910", secondaryColor:"#061e7e" },
    "Athletics": {teamId:133, logoImg: "url(/TeamLogos/Athletics.svg)", primaryColor:"#003831", secondaryColor:"#96791b" },
    "Pirates": {teamId:134, logoImg: "url(/TeamLogos/Pirates.svg)", primaryColor:"#ffce34", secondaryColor:"#1b1a1b" },
    "Padres": {teamId:135, logoImg: "url(/TeamLogos/Padres.svg)",  primaryColor:"#2f241c", secondaryColor:"#c5aa69" },
    "Mariners": {teamId:136, logoImg: "url(/TeamLogos/Mariners.svg)", primaryColor:"#0c2c56", secondaryColor:"#005c5c" },
    "Giants": {teamId:137, logoImg: "url(/TeamLogos/Giants.svg)",  primaryColor:"#fd5a1e", secondaryColor:"#000000" },
    "Cardinals": {teamId:138, logoImg: "url(/TeamLogos/Cardinals.svg)", primaryColor:"#be0a14", secondaryColor:"#ffffff" },
    "Rays": {teamId:139, logoImg: "url(/TeamLogos/Rays.svg)",  primaryColor:"#092c5c", secondaryColor:"#8fbbe3" },
    "Rangers": {teamId:140, logoImg: "url(/TeamLogos/Rangers.svg)", primaryColor:"#003278", secondaryColor:"#ffffff" },
    "Blue Jays": {teamId:141, logoImg: "url(/TeamLogos/BlueJays.svg)", primaryColor:"#022c73", secondaryColor:"#d62822" },
    "Twins": {teamId:142, logoImg: "url(/TeamLogos/Twins.svg)", primaryColor:"#091f40", secondaryColor:"#ffffff" },
    "Phillies": {teamId:143, logoImg: "url(/TeamLogos/Phillies.svg)", primaryColor:"#e81828", secondaryColor:"#012f8a" },
    "Braves": {teamId:144, logoImg: "url(/TeamLogos/Braves.svg)", primaryColor:"#ce1141", secondaryColor:"#142850" },
    "White Sox": {teamId:145, logoImg: "url(/TeamLogos/WhiteSox.svg)", primaryColor:"#000000", secondaryColor:"#000000" },
    "Marlins": {teamId:146, logoImg: "url(/TeamLogos/Marlins.svg)", primaryColor:"#00a3e0", secondaryColor:"#000000" },
    "Yankees": {teamId:147, logoImg: "url(/TeamLogos/Yankees.svg)", primaryColor:"#132448", secondaryColor:"#ffffff" },
    "Brewers": {teamId:158, logoImg: "url(/TeamLogos/Brewers.svg)", primaryColor:"#ffc52f", secondaryColor:"#12284b" },
};

function PlayerCard(props) {
    let teamName = "";
    Object.entries(teams).forEach(([team, teamInfo]) => {
        if (teamInfo.teamId === props.teamId){
            teamName = team;
            return;
        }
    });
    
    const teamLogoUrl = teams[teamName].logoImg;
    const teamColorPrim = teams[teamName].primaryColor;
    const teamColorSec = teams[teamName].secondaryColor;
    
    return (
    <div className="player-card" style={{boxShadow: `10px 5px ${teamColorPrim}`, backgroundColor: `${teamColorSec}`, backgroundImage: teamLogoUrl }}>
        {/* <img className="player-img" src={`https://content.mlb.com/images/headshots/current/60x60/${props.playerId}.png`}/> */}
        <img className="player-img" src={`https://midfield.mlbstatic.com/v1/people/${props.playerId}/spots/90`}/> 
        <PlayerStats stats={props.stats}/>
    </div>
    )
}

export default PlayerCard;
export { teams };