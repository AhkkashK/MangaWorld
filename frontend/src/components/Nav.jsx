import React from 'react';
import logo from "./../images/logo.png"
import "./../css/Nav.css"
import {Link} from  "react-router-dom";


export default function Nav() {
   
    return (
        <nav className="navbar">
            <Link to="/"><img src={logo} alt="logo du site" className='logoPage'/></Link>
            <ul>
                <Link to="/mangas" className='link-li'><li>MANGAS</li></Link>
            </ul>
        </nav>
    );
}
