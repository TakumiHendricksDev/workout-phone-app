import axios from 'axios';

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

export {loginUser, registerUser};