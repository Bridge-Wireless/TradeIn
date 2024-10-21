import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import './Home.css';

const Header = () => {
    return (
        <>
            <div className="sticky-top d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom box-shadow">
            <h5 className="my-0 mr-md-auto font-weight-normal"><Link to="/">Evergreen Wireless</Link></h5>
                <Navigation />
                <Link className="btn btn-outline-primary" to="/login">Login</Link>
                
                <Link className="btn btn-outline-primary" to="/admin">Sales Rep</Link>
            </div>
        </>
    );
};

export default Header;
