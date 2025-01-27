import React from "react";
import '../../styles/dashboard/dashboard.css';
import PrimaryNav from "../../views/components/navigation/primary-nav";
import DashboardLayout from "../../views/layout/dashboard";

export default function Dashboard(){
    return(
        <>
            <DashboardLayout nav={<PrimaryNav/>}/>
        </>
    );
}