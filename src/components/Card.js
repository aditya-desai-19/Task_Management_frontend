//@ts-check
import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Styles from './Card.module.css';

const Card = ({id, name, description, createdDate}) => {
    return (
        <div className={Styles.main}>
            <h4>{name}</h4>
            <p>{description}</p>
            <p>{`Created at ${createdDate}`}</p>
            <div className={Styles.buttonContainer}>
                <Button type='button' className={Styles.button} variant='danger'>Delete</Button>
                <Button type='button' className={Styles.button} variant='info'>Edit</Button>
                <Button type='button' className={Styles.button} variant='primary'>View</Button>
            </div>
        </div>
    )
}

export default Card