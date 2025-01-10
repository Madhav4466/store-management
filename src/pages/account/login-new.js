import React from "react";
import '../../styles/account/login.css';
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoginNew(){
    return(
        <div className="col-lg-4 m-auto d-flex align-items-center flex-column p-3 login">
            <div className="row w-100 title p-3">
                <h2>Login</h2>
            </div>
            <div className="row w-100 d-flex text-start p-3">
                <Form method="POST" actions="/">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="name@example.com" name="userName" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="password" name="password" />
                    </Form.Group>
                    <Form.Group className="">
                        <Form.Control type="submit" className="btn btn-info" value={"Login"}></Form.Control>
                    </Form.Group>
                </Form>
            </div>
            <div className="row w-100 d-flex">
                <Link class="btn btn-link w-50" to="/account/forgot">Forgot Password?</Link>
                <Link class="btn btn-link w-50" to="/account/create">New User?</Link>
            </div>
        </div>
    );
}