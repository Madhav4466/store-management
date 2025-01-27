import React from "react";
import '../../styles/global/header.css'
import logo from '../../logo.svg';

export default function Header(){
    return(
        <header className="app-header">
            <div className="logo-container">
                <img src={logo} alt="" height={100} width={100} style={{"float" : "left"}}></img>
            </div>
            <div className="nav"></div>
        </header>
    );
}