
import { Link } from "react-router-dom";
const Navigation = () => {
    return (
        <>
              
           
            <nav className="my-2 my-md-0 mr-md-3">
                <Link className="p-2 text-dark" to="/">Home</Link>
                {/* <Link className="p-2 text-dark" to="/about">About Us</Link> */}
                <Link className="p-2 text-dark" to="/tradein">Trade-In</Link>
                {/* <Link className="p-2 text-dark" to="/shop">Shop</Link> */}
                <Link className="p-2 text-dark" to="/contact">Contact Us</Link>
            </nav>
            
        </>
    );
  };
  
  export default Navigation;