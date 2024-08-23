//@ts-check
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginSignUpForm from './components/LoginSignUpForm';
import Task from './pages/Task';
import NotFound from './pages/NotFound';

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
    {
        path: "*",
        element: <NotFound />
    }
]);


export default router;