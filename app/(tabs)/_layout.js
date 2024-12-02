const {Tabs} = require('expo-router');
import {FontAwesome} from '@expo/vector-icons';

export default function RootLayout () {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome name="home" color={color} size={size} />
                    )
                }}
            ></Tabs.Screen>
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    title: "Profile",
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome name="user" color={color} size={size} />
                    )
                }}
            ></Tabs.Screen>
            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: false,
                    title: "Settings",
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome name="cog" color={color} size={size} />
                    )
                }}
            ></Tabs.Screen>
        </Tabs>
    );
}