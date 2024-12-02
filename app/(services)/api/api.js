import axios from 'axios';
import {useSelector} from "react-redux";

// Login

const loginUser = async ({email, password}) => {
    const response = await axios.post(
        'https://a8b3833b3112.ngrok.app/api/users/login', {
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
        'https://a8b3833b3112.ngrok.app/api/users/register', {
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

const get = async (url) => {
    const {user} = useSelector((state) => state.auth);

    if (!user) {
        return null;
    }

    const token = user.token_object.access_token;

    try {
        const response = await axios.get(
            url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export {loginUser, registerUser};