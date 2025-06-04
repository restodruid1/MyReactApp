import React from "react";
import PlayerStats from "./PlayerStats";
import LAA from "../TeamLogos/Angels.svg"
import HOU from "../TeamLogos/Astros.svg"
import ATH from "../TeamLogos/Athletics.svg"
import TOR from "../TeamLogos/BlueJays.svg"
import ATL from "../TeamLogos/Braves.svg"
import MIL from "../TeamLogos/Brewers.svg"
import STL from "../TeamLogos/Cardinals.svg"
import CHC from "../TeamLogos/Cubs.svg"
import AZ from "../TeamLogos/Diamondbacks.svg"
import LAD from "../TeamLogos/Dodgers.svg"
import SF from "../TeamLogos/Giants.svg"
import CLE from "../TeamLogos/Guardians.svg"
import SEA from "../TeamLogos/Mariners.svg"
import MIA from "../TeamLogos/Marlins.svg"
import NYM from "../TeamLogos/Mets.svg"
import WSH from "../TeamLogos/Nationals.svg"
import BAL from "../TeamLogos/Orioles.svg"
import SD from "../TeamLogos/Padres.svg"
import PHI from "../TeamLogos/Phillies.svg"
import PIT from "../TeamLogos/Pirates.svg"
import TEX from "../TeamLogos/Rangers.svg"
import TB from "../TeamLogos/Rays.svg"
import CIN from "../TeamLogos/Reds.svg"
import BOS from "../TeamLogos/RedSox.svg"
import COL from "../TeamLogos/Rockies.svg"
import KC from "../TeamLogos/Royals.svg"
import DET from "../TeamLogos/Tigers.svg"
import MIN from "../TeamLogos/Twins.svg"
import CWS from "../TeamLogos/WhiteSox.svg"
import NYY from "../TeamLogos/Yankees.svg"
function PlayerCard(props) {
    const teams = {
        108: {name: LAA, primaryColor:"#003263", secondaryColor:"#ba0021" },
        109: {name: AZ,  primaryColor:"#aa182c", secondaryColor:"#000000" },
        110: {name: BAL, primaryColor:"#df4601", secondaryColor:"#000000" },
        111: {name: BOS, primaryColor:"#bd3039", secondaryColor:"#0d2b56" },
        112: {name: CHC, primaryColor:"#cc3433", secondaryColor:"#0e3386" },
        113: {name: CIN, primaryColor:"#c6011f", secondaryColor:"#ffffff" },
        114: {name: CLE, primaryColor:"#002b5c", secondaryColor:"#e31937" },
        115: {name: COL, primaryColor:"#000000", secondaryColor:"#333367" },
        116: {name: DET, primaryColor:"#0c2c56", secondaryColor:"#ffffff" },
        117: {name: HOU, primaryColor:"#002d62", secondaryColor:"#eb6e1f" },
        118: {name: KC,  primaryColor:"#004687", secondaryColor:"#ffffff" },
        119: {name: LAD, primaryColor:"#005a9c", secondaryColor:"#ffffff" },
        120: {name: WSH, primaryColor:"#ab0003", secondaryColor:"#ffffff" },
        121: {name: NYM, primaryColor:"#ff5910", secondaryColor:"#061e7e" },
        133: {name: ATH, primaryColor:"#003831", secondaryColor:"#96791b" },
        134: {name: PIT, primaryColor:"#ffce34", secondaryColor:"#1b1a1b" },
        135: {name: SD,  primaryColor:"#2f241c", secondaryColor:"#c5aa69" },
        136: {name: SEA, primaryColor:"#0c2c56", secondaryColor:"#005c5c" },
        137: {name: SF,  primaryColor:"#fd5a1e", secondaryColor:"#000000" },
        138: {name: STL, primaryColor:"#be0a14", secondaryColor:"#ffffff" },
        139: {name: TB,  primaryColor:"#092c5c", secondaryColor:"#8fbbe3" },
        140: {name: TEX, primaryColor:"#003278", secondaryColor:"#ffffff" },
        141: {name: TOR, primaryColor:"#022c73", secondaryColor:"#d62822" },
        142: {name: MIN, primaryColor:"#091f40", secondaryColor:"#ffffff" },
        143: {name: PHI, primaryColor:"#e81828", secondaryColor:"#012f8a" },
        144: {name: ATL, primaryColor:"#ce1141", secondaryColor:"#142850" },
        145: {name: CWS, primaryColor:"#000000", secondaryColor:"#000000" },
        146: {name: MIA, primaryColor:"#00a3e0", secondaryColor:"#000000" },
        147: {name: NYY, primaryColor:"#132448", secondaryColor:"#ffffff" },
        158: {name: MIL, primaryColor:"#ffc52f", secondaryColor:"#12284b" },
    };
    const teamLogoUrl = teams[props.teamId].name;
    const teamColorPrim = teams[props.teamId].primaryColor;
    const teamColorSec = teams[props.teamId].secondaryColor;
    
    return (
    <div className="player-card" style={{boxShadow: `10px 5px ${teamColorPrim}`, backgroundColor: `${teamColorSec}`, backgroundImage: `url(${teamLogoUrl})` }}>
        <img className="player-img" src={`https://content.mlb.com/images/headshots/current/60x60/${props.playerId}.png`}/>
        <PlayerStats stats={props.stats}/>
    </div>
    )
}

export default PlayerCard;