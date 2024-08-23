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

export { decodeToken }