const doLogin = async (e) => {
    e.preventDefault();
    const username = document.getElementById('formInputUsername').value;
    const password = document.getElementById('formInputPassword').value;

    const res = await login({ username, password});

    const { auth, accessToken, refreshToken } = res;

    if (auth) {
      setStorage('isAuth', auth);
      window.location.href = 'home.html';
    }
    else {
      alert('Failed to login. Please try again later.');
    }

    if (accessToken) {
      setStorage('accessToken', accessToken);
    }

    if (refreshToken) {
      setStorage('refreshToken', refreshToken);
    }
};

const doRegister = async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('formInputFirstNameReg').value;
    const lastName = document.getElementById('formInputLastNameReg').value;
    const email = document.getElementById('formInputEmailReg').value;
    const username = document.getElementById('formInputUsernameReg').value;
    const password = document.getElementById('formInputPasswordReg').value;

    const res = await register({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password
    });

    if (res) {
        window.location.href = '/';
    }
};

const doLogout = function(e) {
    e.preventDefault();
    logout();
    window.location.href = '/';
};

(() => {
    if (storageHasData()) {
      const isAuth = getStorage('isAuth');
      if (!isAuth) {
        if (document.getElementById('logout')) {
          document.getElementById('logout').style.display = 'none';
        }
        if (document.getElementById('login')) {
          document.getElementById('login').style.display = 'block';
        }
      } else {
        if (document.getElementById('logout')) {
          document.getElementById('logout').style.display = 'block';
        }
        if (document.getElementById('login')) {
          document.getElementById('login').style.display = 'none';
        }
      }
    } else {
      if (document.getElementById('logout')) {
        document.getElementById('logout').style.display = 'none';
      }
    }
  })();