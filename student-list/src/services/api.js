const API_BASE_URL = "https://localhost:7186/api/SinhVien";

const ApiService = {
    get(endpoint) {
        return fetch(`${API_BASE_URL}${endpoint}`).then((response) =>
            response.json()
        );
    },

    post(endpoint, data) {
        return fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        }).then((response) => response.json());
    },

    put(endpoint, data) {
        return fetch(`${API_BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        }).then((response) => response.json());
    },

    delete(endpoint) {
        return fetch(`${API_BASE_URL}${endpoint}`, {
        method: "DELETE",
        }).then((response) => response.json());
    },
};

export default ApiService;
