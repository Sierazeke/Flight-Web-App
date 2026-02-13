const BASE_URL = 'http://127.0.0.1:8000/api';

async function request(endpoint, method = 'GET', data = null) {
    const url = `${BASE_URL}${endpoint}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Something went wrong');
        }

        return responseData;

    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
}

const Api = {
    get: (endpoint) => request(endpoint, 'GET'),
    post: (endpoint, data) => request(endpoint, 'POST', data),
    put: (endpoint, data) => request(endpoint, 'PUT', data),
    patch: (endpoint, data) => request(endpoint, 'PATCH', data),
    delete: (endpoint) => request(endpoint, 'DELETE'),
};

export default Api;
