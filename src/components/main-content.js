import { Button, Form } from "react-bootstrap";
import SummaryCard from "./card/summaryCard";
import { DataTable } from "./tables";

export default function MainContent(){
    return(
        <div className="dashboard-main col-md-10 d-flex flex-column gap-3 p-3">
            <div className="row main-title justify-content-center p-1">
                <div className="col-md-4 d-flex justify-content-start gap-2">
                    <Button>=</Button>
                    <Button>1</Button>
                </div>
                <div className="col-md-4 d-flex justify-content-start gap-2">
                    <Form.Control type="search" placeholder="search"/>
                </div>
                <div className="col-md-4 d-flex justify-content-end gap-1">
                    <div><Button variant="info">N</Button></div>
                    <div><Button variant="dark">+ Add New</Button></div>
                </div>
            </div>
            <div className="row main-title justify-content-start p-1">
                <div className="col-md-6">
                    <div role="heading" aria-level={2} className="h3 m-0">Welcome Back</div>
                    <p className="m-0">User!</p>
                </div>
            </div>
            <div className="row main-content justify-content-center p-1 gap-3">
                <div className="col-md-12 d-flex flex-column gap-3">
                    <div role="heading" aria-level={3} className="h5 m-0">Summary</div>
                    <div className="row justify-content-between gap-1">
                        <div className="col-md-2">
                            <SummaryCard cardTitle={"Revenue"} value={"Rs. 100000"}/>
                        </div>
                        <div className="col-md-2">
                            <SummaryCard cardTitle={"Total Sale"} value={"Rs. 100000"}/>
                        </div>
                        <div className="col-md-2">
                            <SummaryCard cardTitle={"Purchases"} value={"Rs. 100000"}/>
                        </div>
                        <div className="col-md-2">
                            <SummaryCard cardTitle={"Products"} value={"Rs. 100000"}/>
                        </div>
                        <div className="col-md-2">
                            <SummaryCard cardTitle={"Out of Stocks"} value={"Rs. 100000"}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 d-flex gap-2 p-2">
                    <div className="col-md-6 d-flex flex-column gap-3">
                        <div role="heading" aria-level={3} className="h5 m-0">Recent Sale</div>
                        <DataTable></DataTable>
                    </div>
                    <div className="col-md-6 d-flex flex-column gap-3">
                        <div role="heading" aria-level={3} className="h5 m-0">Recent Purchase</div>
                        <DataTable></DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
}