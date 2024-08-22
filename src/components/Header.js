//@ts-check
import React, { useCallback, useContext } from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import Styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { toast } from 'react-toastify';

const Header = () => {
    const { user, updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logOut = useCallback(() => {
        updateUser({});
        toast.success("Successfully logged out");
    }, [updateUser]);

    return (
        <Navbar bg="primary" className={Styles.navbar}>
            <Container>
                <Navbar.Brand href="#home" className={Styles.logo}>Taskly</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {Object.keys(user).length ?
                        <Button type='button' variant='danger' onClick={logOut}>Logout</Button>
                    :
                        <>
                            <Button type='button' variant='light' onClick={() => navigate("/login")} className={Styles.login}>Login</Button>
                            <Nav.Link className={Styles.signup}>Signup</Nav.Link>
                        </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;