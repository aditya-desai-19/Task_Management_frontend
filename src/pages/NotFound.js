import React from 'react';
import Styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={Styles.main}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
        </div>
    );
}

export default NotFound;
