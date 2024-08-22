//@ts-check
import React, { useContext } from 'react'
import UserContext from '../UserContext'

const Task = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            {Object.keys(user).length ? <h2>Tasks</h2> : "Please login"}
        </div>
    )
}

export default Task