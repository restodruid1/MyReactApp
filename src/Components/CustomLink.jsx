import React from "react";
import { Link } from "react-router-dom";
import "../styles/dropdown.css";

function CustomLink(props){
    const {teamName, color} = props;
    const [isHovered, setisHovered] = React.useState(false);
    
    
    return (
        <Link
            onMouseEnter={()=>setisHovered(true)}
            onMouseLeave={()=>setisHovered(false)} 
            style={isHovered ? {color: color, transition: 'color 0.3s ease', textShadow:'0 0 2px #ffffff'} : {color: "black",textShadow:'none'}} 
            className="link-team" 
            to={`/team/${teamName}`}>
                
                {teamName}
        </Link>
    );
}

export default CustomLink;