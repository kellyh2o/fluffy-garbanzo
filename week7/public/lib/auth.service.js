const AUTH_API = `${BASE_API_URL}/auth`;
const USER_API = `${BASE_API_URL}/users`;

/**
 * @class AuthService
 * 
 * Service for authentication methods.
 */
class AuthService {
    /**
     * Registers a new user.
     * 
     * @param {Object} formData - { firstName, lastName, email, username, password }
     */
    register = (formData) => _post(`${AUTH_API}/register`, formData);

    /**
     * Logs a user into the application.
     * 
     * @param {Object} formData - { username, password }
     */
    login = (formData) => _post(`${AUTH_API}/login`, formData);

    setExpiration = (maxExpiration) => 
        new Date(new Date().getTime() + maxExpiration * 1000);

    /**
     * Check the current user's authentication.
     */
    isAuth = () => {
        return getStorage('accessToken');
    }

    /**
     * Check token's lifespan. Expiration is provided by the server.
     */
    isTokenExpired() {
        const expiryDate = getStorage('expiresIn');
        const isExpired = expiryDate === new Date();

        if (isExpired) {
            localStorage.clear();
        }

        return isExpired;
    }

    /**
     * Logs a user out of the application 
     */
    logout = () => {
        localStorage.clear();
        window.location.href = '/';
    };
}

const authService = new AuthService();