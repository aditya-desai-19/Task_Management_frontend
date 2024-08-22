//@ts-check
import React, { useCallback, useEffect } from 'react';
import Header from './components/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleClientId } from './Constants';
import { store } from './redux/store';
import { Provider, useDispatch } from 'react-redux';
import { addUser } from './redux/slices/userSlice';
import Cookies from 'js-cookie';
import { decodeToken } from './utils/Common';

const App = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const updateUser = useCallback((token) => {
		try {
			const user = decodeToken(token)
			if (user && Object.keys(user).length) {
				dispatch(addUser(user));
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		const token = Cookies.get('token');
		updateUser(token);
		navigate("/task");
	}, []);

	return (
		<>
			<GoogleOAuthProvider clientId={GoogleClientId}>
				<Header />
				<Outlet />
				<ToastContainer />
			</GoogleOAuthProvider>
		</>
	);
}

export default App;
