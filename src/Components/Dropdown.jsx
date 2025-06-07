import React from "react";
import { Link } from "react-router-dom";

function Dropdown(props){
    //const propsArr = [props];
    //console.log(propsArr[0]);
    console.log(props.data);
    
    return (
        <div 
            className="dropdown" 
            style={{
                position:"absolute",
                minHeight: "fit-content",
                width:"200px",
                zIndex:5,
                }}
        >
            {props.data.map((prop, index)=>{
                return (
                    <p key={index}>{prop.title} <Link to={prop.route} state={{year:prop.year}}>
                        {prop.year}</Link>
                    </p>
                )
            })}
        </div> 
    );
}

export default Dropdown;