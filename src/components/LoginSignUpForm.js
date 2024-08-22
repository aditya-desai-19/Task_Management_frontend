//@ts-check
import React, { useCallback, useContext, useMemo } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Styles from './LoginSignUpForm.module.css';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slices/userSlice';
import Cookies from 'js-cookie';
import { decodeToken } from '../utils/Common';
import axiosInstance from '../utils/api';

const LoginSignUpForm = ({ isSignUp }) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const pageTitle = useMemo(() => {
        return isSignUp ? "Signup" : "Login";
    }, [isSignUp]);

    const callSignUpApi = useCallback(async (values) => {
        try {
            const { confirmPassword, password } = values;
            if (password !== confirmPassword) {
                toast.error("Password does not match");
                return;
            }
            const response = await axiosInstance.post("/api/user/signup", values)
            if (response.status === 201) {
                toast.success("Successfully signed up");
                navigate("/login");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log({ error })
            toast.error("Some error occured")
        }
    }, []);

    const navigateUserOnSuccessfullLogin = useCallback((token) => {
        toast.success("Successfully logged in");
        const user = decodeToken(token);
        console.log({token, user})
        if (user && Object.keys(user).length) {
            dispatch(addUser(user));
            Cookies.set('token', token, { expires: 1 });
            navigate("/task");
        } else {
            throw new Error();
        }
    }, [addUser, decodeToken]);

    const callLoginApi = useCallback(async (values) => {
        try {
            const response = await axiosInstance.post("/api/user/login", values);
            if (response.status === 200) {
                navigateUserOnSuccessfullLogin(response.data.token);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log({ error })
            toast.error("Some error occured");
        }
    }, []);

    const onSubmit = useCallback((values) => {
        console.log({ values })
        isSignUp ? callSignUpApi(values) : callLoginApi(values);
        reset();
    }, [callLoginApi, callSignUpApi, isSignUp]);

    const onGoogleAuthSuccess = useCallback(async (value) => {
        try {
            const credential = { credential: value.credential };
            const response = await axiosInstance.post("/api/user/google-auth", credential);
            navigateUserOnSuccessfullLogin(response.data.token);
        } catch (error) {
            console.log({ error })
            toast.error("Some error occured");
        }
    }, []);

    const onGoogleAuthFailure = useCallback(() => {
        toast.error("Some error occured");
    }, []);

    return (
        <div className={Styles.formContainer} style={{ marginTop: isSignUp ? "20px" : undefined }}>
            <h4>{pageTitle}</h4>
            <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "350px", border: "1px solid blue", padding: "10px" }}>
                {isSignUp &&
                    <>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="First Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="John" {...register("firstName", { required: true })} />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Last Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Doe" {...register("lastName")} />
                        </FloatingLabel>
                    </>
                }
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com" {...register("email", { required: true })} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" {...register("password", { required: true })} />
                </FloatingLabel>
                {isSignUp &&
                    <FloatingLabel controlId="floatingPassword" label="Confirm password" className={Styles.confirmPassword}>
                        <Form.Control type="password" placeholder="Confirm password" {...register("confirmPassword", { required: true })} />
                    </FloatingLabel>
                }
                <Button type='submit' className={Styles.submitButton}>{pageTitle}</Button>
                <div className={Styles.linkContainer}>
                    <p>
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}
                        <Link to={isSignUp ? "/login" : "/signup"} className={Styles.signUpLoginLink}>
                            {isSignUp ? "Login" : "Signup"}
                        </Link>
                    </p>
                    <GoogleLogin onSuccess={(res) => onGoogleAuthSuccess(res)} onError={(err) => onGoogleAuthFailure} />
                </div>
            </Form>
        </div>
    )
}

export default LoginSignUpForm