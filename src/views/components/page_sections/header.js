import React from "react";
import { Col } from "react-bootstrap";

export default function Header({ nav }) {
    return(
        <Col lg={12} className="p-0">
            <header className="col-12">
                {nav}
            </header>
        </Col>
    );
}