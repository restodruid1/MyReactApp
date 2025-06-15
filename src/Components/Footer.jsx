import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${month}/${day}/${year}`;
    return (
        <footer>
            <Link className="link" to="/">Home</Link>
            <p>{formattedDate}</p>
        </footer>
    );
}

export default Footer;