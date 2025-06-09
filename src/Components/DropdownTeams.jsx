import React from "react"; 
import { Link } from "react-router-dom";

function DropdownTeams(){
    return (
            <div 
                className="dropdown" 
            >
                <p style={{display:"inline"}}>{title} </p>
                {dataYears.map((seasonYear, index)=>{
                    return (
                        <p
                        key={index}
                        style={{display: "inline"}}
                        >
                            <Link to={route} state={{year:seasonYear}}>
                                {dataYears.length - 1 === index ? seasonYear : `${seasonYear},`} 
                            </Link>
                        </p>
                    )
                })}
            </div> 
        );
}

export default DropdownTeams;