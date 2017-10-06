import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'

class Header extends Component{
    render() {
        return(
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Invoice App</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <LinkContainer to="/invoices">
                            <NavItem>Invoices</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/products">
                            <NavItem>Products</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/customers">
                            <NavItem>Customers</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default Header




