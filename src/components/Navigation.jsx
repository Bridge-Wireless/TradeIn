// import React from 'react';
// import TooltipBtn from './TooltipBtn';
// import { BsFillHouseDoorFill, BsEnvelopeFill, BsCalendarWeekFill, BsFillGearFill, BsCartFill } from 'react-icons/bs';
// import { RiLogoutBoxRFill } from 'react-icons/ri';
// import './Navigation.css'; // Optional: Custom CSS for further styling

// function Navigation() {
//     return (
//         <nav className="nav-container d-flex flex-column justify-content-between h-100 p-4">
//             {/* Top Section */}
//             <ul className="nav flex-column list-unstyled">
//                 <li className="nav-item my-3 d-flex justify-content-center">
//                     <TooltipBtn icon={<BsFillHouseDoorFill />} name="Home" />
//                 </li>
//             </ul>

//             {/* Middle Section */}
//             <ul className="nav flex-column list-unstyled">
//                 <li className="nav-item my-3 d-flex justify-content-center">
//                     <TooltipBtn icon={<BsEnvelopeFill />} name="Email" />
//                 </li>
//                 <li className="nav-item my-3 d-flex justify-content-center">
//                     <TooltipBtn icon={<BsCalendarWeekFill />} name="Calendar" />
//                 </li>
//                 <li className="nav-item my-3 d-flex justify-content-center">
//                     <TooltipBtn icon={<BsFillGearFill />} name="Settings" />
//                 </li>
//                 <li className="nav-item my-3 d-flex justify-content-center">
//                     <TooltipBtn icon={<BsCartFill />} name="Cart" />
//                 </li>
//             </ul>

//             {/* Bottom Section */}
//             <ul className="nav flex-column list-unstyled">
//                 <li className="nav-item my-3 d-flex justify-content-center">
//                     <TooltipBtn icon={<RiLogoutBoxRFill />} name="Logout" />
//                 </li>
//             </ul>
//         </nav>
//     );
// }

// export default Navigation;
import React from 'react';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsSearch, BsCart } from 'react-icons/bs'; // Icons from React Icons

const Navigation = () => {
    return (
        <Navbar bg="transparent" expand="lg" className="py-3">
            <Container>
                {/* Left-aligned Brand */}
                <Navbar.Brand href="/" className="text-white fw-bold">
                    EVERGREEN WIRELESS
                </Navbar.Brand>

                {/* Toggle button for mobile view */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Collapsible Links & Icons */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {/* Nav Links */}
                        <Nav.Link as={Link} to="/" className="text-white mx-2">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/shop" className="text-white mx-2">
                            Shop
                        </Nav.Link>

                        {/* Separator */}
                        <span className="text-white mx-2">|</span>

                        {/* Icons */}
                        <Nav.Link href="#" className="text-white mx-2">
                            <BsSearch size={20} />
                        </Nav.Link>
                        <Nav.Link href="#" className="text-white mx-2">
                            <BsCart size={20} />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
