import React from "react";
import '../styles/components/left-panel.css';
import logo from '../logo.svg'
import { Link } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";
import { Avatar } from "@mui/material";

export default function LeftPanel(){
    return (
      <div className="col-md-2 d-flex align-items-center flex-column gap-2 p-2 justify-content-between">
        <div className="row">
            <div className="col-md-4 d-flex flex-column align-items-start p-0">
                <img src={logo} className="userImage" alt="" height={"100%"} width={"100%"}></img>
            </div>
            <div className="col-md-8 d-flex flex-column align-items-start justify-content-center p-0">
                <p className="m-0">My Brand</p>
            </div>
        </div>
        <div className="row w-100">
            <div className="col-md-12 d-flex flex-column align-items-center">
                <ListGroup as="ul" className="w-100 sidebar-menu app-nav">
                    <ListGroup.Item as="li" active className="item">
                        <Link to="/dashboard">Dashboard</Link>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="item">
                        <Link to="/sales">Sales</Link>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="item">
                        <Link to="/purchase">Purchases</Link>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="item">
                        <Link to="/products">Products</Link>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="item">
                        <Link to="/account/login">Logout</Link>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
        <div className="row gap-2">
            <div className="col-md-12 d-flex justify-content-center">
                <Avatar
                    sx={{
                        bgcolor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
                        Math.random() * 255
                        )}, ${Math.floor(Math.random() * 255)})`,
                        height: "50px",
                        width: "50px"
                    }}
                    >
                    MS
                </Avatar>
            </div>
            <div className="col-md-12 d-flex flex-column justify-content-center text-center">
                <p className="m-0">Madhav Saraf</p>
                <p className="m-0">Admin</p>
            </div>
            <div className="col-md-12 d-flex justify-content-center align-items-center gap-3">
                <Button variant="light">S</Button>
                <Button variant="light">L</Button>
            </div>
            </div>
        </div>
    );
}