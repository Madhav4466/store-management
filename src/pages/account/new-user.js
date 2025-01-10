import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NewUser(){
    return(
        <div className="col-lg-4 m-auto d-flex align-items-center flex-column p-3 login">
            <div className="row w-100 title">
                <h2>Signup</h2>
            </div>
            <div className="row w-100 d-flex text-start p-3">
                <Form method="POST" actions="account/login">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" name="firstName" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" name="lastName" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" name="email" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" required/>
                    </Form.Group>
                    <Form.Group className="">
                        <Form.Control type="submit" className="btn btn-info" value={"Sign up"}></Form.Control>
                    </Form.Group>
                </Form>
            </div>
            <div className="row w-100 d-flex">
                <Link class="btn btn-link w-50" to="/account/login">Already User?</Link>
            </div>
        </div>
    );
}