import React from "react";
import '../../styles/dashboard/dashboard.css';
import LeftPanel from "../../components/left-panel";
import MainContent from "../../components/main-content";

export default function Dashboard(){
    return(
        <>
            <LeftPanel/>
            <MainContent/>
        </>
    );
}