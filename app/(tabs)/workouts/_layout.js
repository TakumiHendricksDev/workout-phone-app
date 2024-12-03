import {Stack} from "expo-router";

const WorkoutStack = () => {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    headerShown: true,
                    title: 'Workouts'
                }}
            ></Stack.Screen>
            <Stack.Screen
                name='[id]'
                options={{
                    headerShown: true,
                    title: 'Workout'
                }}
            ></Stack.Screen>
        </Stack>
    )
}

export default WorkoutStack;