import { Button } from "react-bootstrap";
import '../../styles/components/summary-card.css';

export default function SummaryCard({cardTitle, value}){
    return(
        <div className="summary-card container d-flex flex-column gap-1">
            <div className="row">
                <div className="col-md-12">
                    <div className="h6" role="heading" aria-level={4}>{cardTitle}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">{value}</div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <p className="m-0">0%</p>
                </div>
                <div className="col-md-6">
                    <Button variant="light" size="sm">See All</Button>
                </div>
            </div>
        </div>
    );
}