
const accessToken = storageHasData() ? getStorage('accessToken') : '';
const token =  `Bearer ${accessToken}`;

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