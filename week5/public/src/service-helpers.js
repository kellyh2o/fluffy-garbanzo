const setStorage = (key, data) => {
    const dataAsString = JSON.stringify(data);
    const encodedData = btoa(dataAsString);
    localStorage.setItem(key, encodedData);
};

const getStorage = (key) => {
    const value = localStorage.getItem(key);
    const decodedData = atob(value);
    return JSON.parse(decodedData);
};

const clearStorage = (key) => {
    localStorage.removeItem(key);
};

const storageHasData = () => localStorage.length > 0;


const access_token = storageHasData() ? getStorage('access_token') : '';
const token =  `Bearer ${access_token}`;

const _get = async (url) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
    });
    return res.json();
};

const _post = async (url, data) => {
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            //Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    console.log(res);
    return res.json();
}

const _put = async (url, data) => {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return res.json();
}