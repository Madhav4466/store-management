import React from "react";
import '../../styles/account/login.css';
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ForgotPassword(){
    return(
        <div className="col-lg-4 m-auto d-flex align-items-center flex-column p-3 login">
            <div className="row w-100 title">
                <h2>Forgot Password</h2>
            </div>
            <div className="row w-100 d-flex text-start p-3">
                <Form method="POST" actions="account/login">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" name="email" />
                    </Form.Group>
                    <Form.Group className="">
                        <Form.Control type="submit" className="btn btn-info" value={"Send Email"}></Form.Control>
                    </Form.Group>
                </Form>
            </div>
            <div className="row w-100 d-flex">
                <Link class="btn btn-link w-50" to="/account/login">Login</Link>
            </div>
        </div>
    );
}