import axios from 'axios';
import {useSelector} from "react-redux";
import {store} from "../../(redux)/store";

const base_url = "https://76d2a6b122ed.ngrok.app";

// Login

const loginUser = async ({email, password}) => {
    const response = await axios.post(
        `${base_url}/api/users/login`, {
        email,
        password
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
};

const registerUser = async ({email, password, confirmPassword}) => {
    const response = await axios.post(
        `${base_url}/api/users/register`, {
        email,
        password,
        confirm_password: confirmPassword
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
};

const api = axios.create({
    baseURL: base_url,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const state = store.getState();
        const { user } = state.auth;
        if (user) {
            const token = user.token_object.access_token;
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { loginUser, registerUser, api };