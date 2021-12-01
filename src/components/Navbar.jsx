import React from 'react'
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Collapse, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { logoutAction } from '../redux/action';

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            openCollapse: false
         }
    }

    componentDidMount() {
        console.log(this.props.loading)
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
                            <Link to="/products" className="nav-link" style={{ color: "#2d3436", fontWeight: "bold" }}>
                                Product
                            </Link>
                        </NavItem>
                        <NavItem>
                            <NavLink style={{ color: "#2d3436", fontWeight: "bold" }}>
                                About
                            </NavLink>
                        </NavItem>
                    </Nav>
                    {
                        this.props.loading == true ?
                        <Spinner style={{ marginLeft: "auto" }}></Spinner>
                        :
                        this.props.username 
                            ? 
                            <UncontrolledDropdown style={{ marginLeft: "auto"}}>
                                <DropdownToggle caret nav size="sm" outline className="d-flex align-items-center" style={{ color: "#0984e3" }}>
                                    Hello, <b style={{ fontWeight: "bold" }}>{this.props.username}</b>
                                </DropdownToggle>
                                {
                                    this.props.role == "user"
                                    ?
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <Link to="" style={{ color: "#2d3436", textDecoration:"none" }}>
                                                Cart
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to="" style={{ color: "#2d3436", textDecoration:"none"  }}>
                                                Transactions
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to="" style={{ color: "#2d3436", textDecoration:"none"  }}>
                                                Profile
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem onClick={() => {
                                            localStorage.removeItem("data");
                                            this.props.logoutAction();
                                        }}>
                                            Keluar
                                        </DropdownItem>
                                    </DropdownMenu>
                                    :
                                    <DropdownMenu right >
                                        <DropdownItem>
                                            <Link to="/product-management-page" style={{ color: "#2d3436" }} className="nav-link">
                                                Products Management
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to="" style={{ color: "#2d3436" }} className="nav-link">
                                                Transactions Management
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem onClick={() => {
                                            localStorage.removeItem("data");
                                            this.props.logoutAction();
                                        }}>
                                            Keluar
                                        </DropdownItem>
                                    </DropdownMenu>
                                }
                            </UncontrolledDropdown>
                            :
                            <Link to="/auth-page" style={{ marginLeft: "auto" }}>
                                <Button type="button" color="info" outline >Masuk dan daftar</Button>
                            </Link>
                        
                    }
                </Collapse>
            </Navbar>
         );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        role: state.userReducer.role
    }
}
 
export default connect(mapToProps,{logoutAction}) (NavbarComponent);