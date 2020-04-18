const doLogin = function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    login({
        username: username,
        password: password
    }).then(function(res) {
        if (res.auth) {
            setStorage('isAuth', true);
            setStorage('accessToken', res.accessToken);
            window.location.href = 'home.html';
        }
    });
};

const doRegister = function(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    register({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password
    }).then(function(res) {
        if (res.ok) {
            window.location.href = 'home.html';
        }
    });
};

const doLogout = function(e) {
    e.preventDefault();
};