const USER_API = `${BASE_API_URL}/users/me`; // http://localhost:3001/v1/users/me

class UserApiService {
  getMe = () => _get(USER_API, DEFAULT_OPTIONS_WITH_AUTH);

  updateMe = (formData) =>
    _put(`${USER_API}/update`, formData, DEFAULT_OPTIONS_WITH_AUTH);
}

const userService = new UserApiService();