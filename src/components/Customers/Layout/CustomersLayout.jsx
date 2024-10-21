import { Outlet } from "react-router-dom";
import '../../../includes/css/bootstrap.min.css';
import Header from "./Header";
import Footer from "./Footer";
const CustomersLayout = () => {
  return (
    <>
      <div className="wrapper">
          <Header />
          <div className="content">
            <Outlet />
          </div>
        
          <Footer />
      </div>
      
    </>
  )
};

export default CustomersLayout;