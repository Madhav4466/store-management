import React from "react";
import '../../../styles/components/left-panel.css';
import logo from '../../../logo.svg'
import { Link, useLocation } from "react-router-dom";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { FaRegCaretSquareRight } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { AiOutlineProduct } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function LeftPanel() {
    const dashboardMenu = [
        {
            linkText: "Dashboard",
            route: "/",
            icon: <FiHome />
            ,
        },
        {
            linkText: "Sale",
            route: "/sale",
            icon: <GiNotebook />,
        },
        {
            linkText: "Purchase",
            route: "/purchase",
            icon: <LiaFileInvoiceSolid/>,
        },
        {
            linkText: "Products",
            route: "/products",
            icon: <AiOutlineProduct/>,
        },
        {
            linkText: "Logout",
            route: "/account/login",
            icon: <MdLogout/>,
        }

    ]
    const location = useLocation();
    const pathName = location.pathname;
 
    return (
        <Col lg={2} className="d-lg-flex d-none align-items-center flex-column gap-2 p-0">
            <Row className="w-100">
                <Col lg={12} className="d-flex justify-content-center" style={{"maxHeight": "100px"}}>
                    <img src={logo} className="userImage" alt="" height={"100%"} width={"100%"}></img>
                </Col>
            </Row>
            <Row className="w-100">
                <Col lg={12} className="d-flex flex-column align-items-center">
                    <ListGroup as="ul" className="w-100 sidebar-menu app-nav p-4">
                        {
                            dashboardMenu.map((menu, id) => {
                                const isActive = menu.route === pathName;
                                return(
                                    <ListGroup.Item key={id} as="li" className={`item ${isActive ? 'active' :''}`}>
                                        <Link to={menu.route} className={`d-flex justify-content-between align-items-center`}>
                                            <div className="d-flex flex-column flex-grow-1">
                                                <div className="d-flex align-items-center gap-3 flex-wrap">
                                                    {menu.icon}
                                                    <span className="text-wrap fs-6">{menu.linkText}</span>
                                                </div>
                                            </div>
                                            <FaRegCaretSquareRight className="d-none d-lg-block d-xl-block" />
                                        </Link>
                                    </ListGroup.Item>
                                );
                            })
                        }
                    </ListGroup>
                </Col>
            </Row>
            <Row className="w-100 gap-2 mt-auto m-2 p-2">
                {/* <Col lg={12} className="d-flex justify-content-center p-2"> */}
                    {/* <Avatar
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
                    </Col>
                <Col lg={12} className="d-flex d-flex flex-column justify-content-center text-center">
                    <p className="m-0">Madhav Saraf</p>
                    <p className="m-0">Admin</p>
                </Col> */}
                <Col lg={12} className="d-flex d-flex align-items-center text-bg-light rounded justify-content-between">
                    <Col lg={4} className="text-center"><IoChatbubbleEllipsesOutline /></Col>
                    <Col lg={4}>
                        <p className="m-0 text-body-secondary">Contact</p>
                        <p className="m-0">Developer</p>
                    </Col>
                    <Col lg={2}>
                        <Button variant="light" className="align-items-center d-flex"><FaRegCaretSquareRight /></Button>
                    </Col>
                </Col>
            </Row>
        </Col>
    );
}