import {Stack} from "expo-router";

const HomeStack = () => {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    headerShown: true,
                    title: 'Home'
                }}
            ></Stack.Screen>
        </Stack>
    )
}

export default HomeStack;