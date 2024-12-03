import ProtectRoute from "../../components/ProtectRoute";

const { Tabs } = require('expo-router');
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import {NavigationContainer} from "expo-router/build/fork/NavigationContainer";

export default function RootLayout() {
    return (
        <ProtectRoute>
            <Tabs
                screenOptions={{
                    headerShown: false,
                }}
                >
                <Tabs.Screen
                    name="home"
                    options={{
                        headerShown: false,
                        title: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="workouts"
                    options={{
                        headerShown: false,
                        title: "Workouts",
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name="dumbbell" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        headerShown: false,
                        title: "Profile",
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="user" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        headerShown: false,
                        title: "Settings",
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="cog" color={color} size={size} />
                        ),
                    }}
                />
            </Tabs>
        </ProtectRoute>
    );
}