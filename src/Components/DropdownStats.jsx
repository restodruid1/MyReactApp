import React from "react";
import { Link } from "react-router-dom";
import "../styles/dropdown.css"

function DropdownStats(props){
    const date = new Date();
    const year = date.getFullYear();
    const stats = [
        {
            title:"Hitting",
            years: [year, year-1, year-2,year-3,year-4],
            route:"/hitters"
        },
        {
            title:"Pitching",
            years: [year, year-1, year-2,year-3,year-4],
            route:"/pitching"
        }
    ]
    
    
    
    //const propsArr = [props];
    //console.log(propsArr[0]);
    // console.log(props.data);
    // const dataYears = props.data[0].years;
    // console.log(dataYears);
    // const title = props.data[0].title;
    // const route = props.data[0].route;
    
    return (
        <div className="dropdown">
            {stats.map((category, index)=>{
                return(
                    <div>
                        <p style={{display:"inline"}}>{category.title} </p>
                        {category.years.map((seasonYear, index)=>{
                            return (
                                <p
                                key={index}
                                style={{display: "inline"}}
                                >
                                    <Link to={category.route} state={{year:seasonYear}}>
                                        {category.years.length - 1 === index ? seasonYear : `${seasonYear},`} 
                                    </Link>
                                </p>
                            )
                        })}
                    </div>)
            })}

        </div> 
    );
}

export default DropdownStats;