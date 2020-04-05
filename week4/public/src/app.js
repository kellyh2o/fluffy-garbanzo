const doLogin = function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login({
        email: email,
        password: password
    }).then(function(res) {
        if (res.ok) {
            window.location.href = 'home.html';
        }
    });
};

const doRegister = function(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    register({
        firstName: firstName,
        lastName: lastName,
        email: email,
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