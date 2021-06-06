


import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavItem from 'react-bootstrap/NavItem';
import Nav from 'react-bootstrap/Nav';
import NavBrand from 'react-bootstrap/NavbarBrand'
//import './header.styles.scss';

const Header = () => (
  <div className='header'>
        <Navbar className="align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <Container className="fluid d-flex flex-column p-0">
                <Link className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" to="/">
                    <NavBrand className="mx-3"><span>Recipe planner</span></NavBrand>
                </Link>
                <hr className="sidebar-divider my-0"/>
                    <Nav className="text-light" id="accordionSidebar">
                        <NavItem>
                            <Link className="nav-link active" to="/" ><span>Browse recipes</span></Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link active" to="/menu"><span>Menu</span></Link>
                        </NavItem>
                    </Nav>
                    <div className="text-center d-none d-md-inline"></div>
            </Container>
        </Navbar>
    </div>
);



export default Header;