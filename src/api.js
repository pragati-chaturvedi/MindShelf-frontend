const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
console.log(API_BASE_URL)

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

export const fetchLatestMindfiles = async () => {
    const response = await fetch(`${API_BASE_URL}/getSummary`, {
        headers: getAuthHeader(),
    });
    const data = await response.json();
    return data.data;
};

export const summarizeAndStoreLink = async (resource) => {
    const response = await fetch(`${API_BASE_URL}/summarize`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ resource }),
    });
    const data = await response.json();
    return data;
};

export const searchMindfiles = async (prompt) => {
    const response = await fetch(`${API_BASE_URL}/search`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    return data.data;
};