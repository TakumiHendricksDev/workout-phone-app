import AsyncStorage from "@react-native-async-storage/async-storage";
import {createSlice} from "@reduxjs/toolkit";

const loadUserFromStorage = async () => {
    try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
        return null;
    }
};

const initialState = {
    user: null,
    isLoading: true
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginUserAction: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            AsyncStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logoutUserAction: (state) => {
            state.user = null;
            state.isLoading = false;
            AsyncStorage.removeItem('userInfo');
        },
        setUserAction: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        }
    }
});

// Actions
export const {loginUserAction, logoutUserAction, setUserAction} = authSlice.actions;

// Reducer
export const authReducer = authSlice.reducer;

// Load User
export const loadUser = () => async (dispatch) => {
    const userInfo = await loadUserFromStorage();
    if (userInfo) {
        dispatch(setUserAction(userInfo));
    }
}
