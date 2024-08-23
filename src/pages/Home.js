//@ts-check
import React from 'react'
import Styles from './Home.module.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div className={Styles.home}>
            <h2 className={Styles.title}>Welcome to Taskly</h2>
            <h4 className={Styles.tagline}>Streamline Your Workflow, Achieve More</h4>
            <Button type='button' className={Styles.redirectBtn} variant='primary' onClick={() => navigate("/login")}>Get started</Button>
        </div>
    )
}

export default Home