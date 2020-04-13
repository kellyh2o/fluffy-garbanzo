const setStorage = (key, data) => {
    const dataAsString = JSON.stringify(data);
    const encodedData = btoa(dataAsString);
    localStorage.setItem(key, encodedData);
};

const getStorage = (key) => {
    const value = localStorage.getItem(key);
    if (value) {
        const decodedData = atob(value);
        return JSON.parse(decodedData);
    }
};

const clearStorage = (key) => {
    localStorage.removeItem(key);
};

const storageHasData = () => localStorage.length > 0;