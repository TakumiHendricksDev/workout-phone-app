import {Stack} from "expo-router";
import {loadUser} from "./authSlice";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

const AppWrapper = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);
    return (
        <Stack>
            <Stack.Screen
                name={'index'}
                options={{
                    headerShown: false,
                    title: 'Home'
                }}
            ></Stack.Screen>
            <Stack.Screen
                name='(tabs)'
                options={{
                    headerShown: false,
                    title: 'BroLiftz',
                    headerBackVisible: false
                }}
            ></Stack.Screen>
        </Stack>
    )
}

export default AppWrapper;