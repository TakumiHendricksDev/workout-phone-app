import {Stack} from "expo-router";
import {NavigationContainer} from "expo-router/build/fork/NavigationContainer";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={
                {headerShown: false}
                }
            ></Stack.Screen>
        </Stack>
    )
}