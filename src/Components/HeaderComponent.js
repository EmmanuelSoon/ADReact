import React, { useState } from 'react';
import {Navbar,  Nav, Button, Container} from 'react-bootstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';



function handleLogOut(){
    localStorage.clear();
    window.location.reload(true);
    //this.props.location.push("http://localhost:8080")
}

function Header(){


    return(
        <React.Fragment>
                <Navbar variant = "light" expand="md" collapseOnSelect className='border-bottom'> 

                    <Container>
                        <Navbar.Brand>
                            <NavLink className="nav-link" to={'/'}>
                                <img src={process.env.PUBLIC_URL + '/asset/images/placeholder.jpg'} height="40" width="41" className="rounded-circle"
                                    alt="blank" />
                                &ensp; Henry's Recipes
                            </NavLink>
                            </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                                <NavLink className="nav-link" to={'/'}>All Recipes</NavLink>
                                <NavLink className="nav-link" to={'/recipe/new'}>Add new Recipe</NavLink>
                        </Nav>
                        <Nav>
                            <NavLink className="nav-link" to={'/logout'}>Logout</NavLink>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>

                </Navbar>
        </React.Fragment>
    )
}

export default Header;