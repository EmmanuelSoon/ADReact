import React, { useState } from 'react';
import {Navbar,  Nav, Button, Container} from 'react-bootstrap';

function Header(){

    return(
        <React.Fragment>
                <Navbar variant = "light" expand="md" collapseOnSelect className='border-bottom'> 

                    <Container>
                        <Navbar.Brand href="#home">
                        <img src={process.env.PUBLIC_URL + '/asset/images/placeholder.jpg'} height="40" width="41"
                                alt="blank" />
                            Henry's Recipes
                            </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/recipes">All Recipes</Nav.Link>
                            <Nav.Link href="#addrecipes">Add new Recipe</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#temp">Log out</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>

                </Navbar>
        </React.Fragment>
    )
}

export default Header;