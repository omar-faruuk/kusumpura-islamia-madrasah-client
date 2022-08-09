import { faBehanceSquare } from '@fortawesome/free-brands-svg-icons';
import { faHome, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Nav = styled.nav`

& ul li{
    margin:5px 12px;
    
}
`
const Navbar = () => {
    return (
        <Nav className="navbar navbar-expand-lg bg-success p-3 navbar-sticky-top  d-flex justify-content-center">
            <div className="container">
                <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    {/* <span className="navbar-toggler-icon text-white"></span> */}
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <h6 className='text-white fw-bold d-lg-none'>Menu</h6>
                <div className="collapse navbar-collapse " id="navbarTogglerDemo01">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-a active  text-white" aria-current="page" href="#"><FontAwesomeIcon icon={faHome} /> হোম</Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-a dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                প্রতিষ্ঠান পরিচিতি
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to="/history" className="dropdown-item text-dark" href="#">ইতিহাস</Link></li>
                                <li><Link to="/viewGovtBody" className="dropdown-item text-dark" href="#">গভর্ণিংবডি</Link></li>
                                <li><Link to="/funding" className="dropdown-item text-dark" href="#">ফান্ডিং</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-a dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                বিভাগ
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item text-dark" href="#">নুরানী</a></li>
                                <li><a className="dropdown-item text-dark" href="#">ইবতেদায়ী</a></li>
                                <li><a className="dropdown-item text-dark" href="#">দাখিল</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="/result" className="nav-a text-white">রেজাল্ট</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/showProject" className="nav-a text-white">কার্যক্রম</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/photoGallery" className="nav-a text-white">ছবি গ্যালারি</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/notice" className="nav-a text-white">নোটিস বোর্ড</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/download" className="nav-a text-white">ডাউনলোড</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-a text-white">যোগাযোগ</Link>
                        </li>


                    </ul>

                </div>
            </div>
        </Nav>
    );
};

export default Navbar;