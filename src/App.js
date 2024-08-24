//@ts-check
import React, { useCallback, useEffect } from 'react';
import Header from './components/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleClientId } from './Constants';
import { useDispatch } from 'react-redux';
import { addUser } from './redux/slices/userSlice';
import { decodeToken, getToken } from './utils/Common';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
		const token = getToken();
		if(token) {
			updateUser(token);
			navigate("/task");
		} else {
			navigate("/home");
		}
	}, []);

	return (
		<>
			<GoogleOAuthProvider clientId={GoogleClientId}>
				<DndProvider backend={HTML5Backend}>
					<Header />
					<Outlet />
					<ToastContainer />
				</DndProvider>
			</GoogleOAuthProvider>
		</>
	);
}

export default App;
