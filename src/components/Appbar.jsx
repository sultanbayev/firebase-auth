import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { logoutThunk } from "../services/actions/userAuth";

const Appbar = () => {

    const dispatch = useDispatch();
    const { user, isUserRequest } = useSelector(store => store.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutThunk(navigate))
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    WellDraw
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/projects">Projects</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        { !user && !isUserRequest && <Nav.Link as={NavLink} to="/login">Log In</Nav.Link> }
                        { user && user.emailVerified && (
                            <NavDropdown
                                id="nav-dropdown"
                                title={user.email}
                                menuVariant="dark"
                            >   
                                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        ) }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Appbar;