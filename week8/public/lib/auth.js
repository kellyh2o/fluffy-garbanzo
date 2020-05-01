const doLogin = async (e) => {
  e.preventDefault();

  const username = document.getElementById('formInputUsername').value;
  const password = document.getElementById('formInputPassword').value;

  try {
    const res = await authService.login({ username, password});
    const { auth, expiresIn, accessToken, refreshToken } = res;

    if (auth) {
      setStorage('isAuth', auth);
    }
    if (expiresIn) {
      const expiryDate = authService.setExpiration(expiresIn);
      setStorage('expiresIn', expiryDate);
    }
    if (accessToken) {
      setStorage('accessToken', accessToken);
    }
    if (refreshToken) {
      setStorage('refreshToken', refreshToken);
    }

    if (res.status && res.status !== 200) {
      alert('Incorrect username or password.' );
    } else {
      window.location.href = "locations/locations.html";
    }
  } catch (err) {
    alert('Failed to login. Please try again later.' );
  }
};

const doRegister = async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('formInputFirstNameReg').value;
    const lastName = document.getElementById('formInputLastNameReg').value;
    const email = document.getElementById('formInputEmailReg').value;
    const username = document.getElementById('formInputUsernameReg').value;
    const password = document.getElementById('formInputPasswordReg').value;

    try {
      const res = await authService.register({
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: username,
          password: password
      });
  
      if (res) {
        window.location.href = '/';
      }
    } catch (err) {
      alert('Failed to register. Please try again later.' );
    }
};

const doLogout = (e) => {
  e.preventDefault();
  authService.logout();
};

(() => {
  const login = document.getElementById('login');
  const logout = document.getElementById('logout');

  if (!authService.isAuth()) {
    if (login) {
      login.style.display = 'block';
    }
    if (logout) {
      logout.style.display = 'none';
    }
  } else {
    if (login) {
      login.style.display = 'none';
    }
    if (logout) {
      logout.style.display = 'block';
    }
  }
})();