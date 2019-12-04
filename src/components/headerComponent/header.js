import React, {Component} from 'react';

import {
    Link
}from 'react-router-dom';

function Header() {
    return (
        <header>
            <div className="logo">
                LOGO
            </div>
            
            <div>
                <form>
                        <input type="text" placeholder="Search"/>
                </form>
            </div>

            <nav>
                <ul>
                    <li className="first">
                        <Link to="/">>Home</Link>
                    </li>
                    <li>
                        <Link to="/Login">Log in</Link>
                    </li>
                    <li className="last">
                        <a href="/SingUp">Sing Up</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
