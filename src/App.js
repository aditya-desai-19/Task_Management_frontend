//@ts-check
import React, { useCallback, useState } from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from './UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleClientId } from './Constants';

const App = () => {
	const [user, setUser] = useState({});

	const updateUser = useCallback((user) => {
		setUser(user);
	}, []);

	return (
		<>
			<GoogleOAuthProvider clientId={GoogleClientId}>
				<UserContext.Provider value={{ user, updateUser }}>
					<Header />
					<Outlet />
					<ToastContainer />
				</UserContext.Provider>
			</GoogleOAuthProvider>
		</>
	);
}

export default App;
