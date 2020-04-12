const BASE_API_URL = 'http://localhost:3001/v1';
const AUTH_API = `${BASE_API_URL}/auth`;
const USER_API = `${BASE_API_URL}/user`;

const USERS_API = `${BASE_API_URL}/users`;
const USER_BY_ID_API = function(userId) {
    return `${USERS_API}/${userId}`;
}

function register(formData) {
    return _post(`${AUTH_API}/register`, formData);
}

function login(formData) {
    return _post(`${AUTH_API}/login`, formData);
}