//@ts-check
import React, { useCallback, useContext } from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import Styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/slices/userSlice';
import Cookies from 'js-cookie';

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(clearUser());
        toast.success("Successfully logged out");
        Cookies.remove("token");
        navigate("/home");
    }, [clearUser]);

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
                            <Button type='button' variant='outline-light' onClick={() => navigate("/signup")} className={Styles.signup}>Signup</Button>
                        </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;