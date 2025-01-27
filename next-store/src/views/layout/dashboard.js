import React from "react";
import { Container, Row } from "react-bootstrap";
import LeftPanel from "../components/page_sections/left-panel";
import DashboardMain from "../components/page_sections/main";

export default function DashboardLayout({ nav }) {
    return(
        <Container fluid className="flex-grow-1 d-flex flex-column">
            <Row className="flex-grow-1">
                <LeftPanel/>
                <DashboardMain/>
            </Row>
        </Container>
    );
}