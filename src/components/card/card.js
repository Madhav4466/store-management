import React from "react";
import '../../styles/account/login.css';
import '../../styles/components/card.css';

export default function Card({cardHeader, cardBody, cardFooter, display, position, content, height, width, classList}){
    return(
        <div className={`content-container ${classList}`} style={{alignItems: position, height: height, width: width}}>
            <div className="container-header">
                {cardHeader}
            </div>
            <div className="container-body">
                {cardBody}
            </div>
            <div className="container-footer">
                {cardFooter}
            </div>
        </div>
    );
}