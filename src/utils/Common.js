import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
    let user = null;
    const decoded = jwtDecode(token);
    if (decoded && Object.keys(decoded).length) {
        user = {
            id: decoded?.user?.id,
            name: decoded?.user?.name
        };
    }
    return user;
}

const setToken = (token) => {
    Cookies.set('token', token, { expires: 1 });
}

const getToken = () => {
    return Cookies.get("token");
}

const removeToken = (token) => {
    Cookies.remove(token);
}

export { decodeToken, getToken, setToken, removeToken }