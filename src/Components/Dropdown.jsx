import React from "react";
import { Link } from "react-router-dom";

function Dropdown(props){
    const propsArr = [props];
    
    
    return (
        <div 
            className="dropdown" 
            style={{
                position:"absolute",
                height:"100px",
                width:"200px",
                }}
        >
            {propsArr.map((prop)=>{
                return (
                    <p>{prop.title} <Link to={prop.route}>{prop.content}</Link></p>
                )
            })}
        </div> 
    );
}

export default Dropdown;