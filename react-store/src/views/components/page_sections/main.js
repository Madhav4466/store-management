import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "./header";
import PrimaryNav from "../navigation/primary-nav";

export default function DashboardMain () {
    return(
        <Col lg={10} className="p-0">
            <Container fluid className="p-0">
                <Row className="mx-0">
                    <Header nav={<PrimaryNav/>}/>
                </Row>
            </Container>
        </Col>
    )
}