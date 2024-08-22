//@ts-check
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginSignUpForm from './components/LoginSignUpForm';
import Task from './components/Task';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <LoginSignUpForm isSignUp={false}/>
            },
            {
                path: "/signup",
                element: <LoginSignUpForm isSignUp={true}/>
            },
            {
                path: "/task",
                element: <Task />
            },
        ]
        
    },
]);


export default router;