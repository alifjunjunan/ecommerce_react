import React from 'react'
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Collapse, Button } from 'reactstrap';

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            openCollapse: false
         }
    }
    render() { 
        return ( 
            <Navbar expand="md">
                <NavbarBrand>
                    <Link to="/">
                    <img src="https://www.sipayo.com/wp-content/uploads/2017/12/e-commerce.png" width="50px" alt="logo-brand" />
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={() => this.setState({ openCollappse: !this.state.openCollapse})}/>
                <Collapse isOpen={this.state.openCollapse} navbar>
                    <Nav>
                        <NavItem>
                            <NavLink>
                                Product
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <Link className="text-decoration-none" to="/product-management-page">
                                <NavLink>
                                    Product Management
                                </NavLink>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                About
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Link to="/auth-page" style={{ marginLeft: "auto" }}>
                        <Button type="button" color="info" outline >Masuk dan daftar</Button>
                    </Link>
                </Collapse>
            </Navbar>
         );
    }
}
 
export default NavbarComponent;