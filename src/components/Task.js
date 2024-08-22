//@ts-check
import React from 'react'
import { useSelector } from 'react-redux'

const Task = () => {
    const user = useSelector((state) => state.user.user);

    return (
        <div>
            {Object.keys(user).length ? <h2>Tasks</h2> : "Please login"}
        </div>
    )
}

export default Task