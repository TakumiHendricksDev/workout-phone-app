import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Video, ResizeMode } from "expo-av";
import {useRouter} from "expo-router";

const Home = () => {
    const video = React.useRef(null);
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: "https://cdn.pixabay.com/video/2019/04/23/23014-332483130_large.mp4"
                }}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping={true}
            ></Video>
            <View style={styles.overlay}>
                <Text style={styles.mainText}>
                    Bro Liftz
                </Text>
                <Text style={styles.subText}>
                    Workout App for Bros
                </Text>
                <Text style={styles.subText}>
                    Get Big, Get Strong
                </Text>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button}
                    onPress={() => {router.push("/auth/login")}}
                >
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => {router.push("/auth/register")}}
                >
                    <Text style={styles.buttonText}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    video: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    mainText: {
        fontSize: 52,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        color: 'white',
    },
    subText: {
        fontSize: 24,
        fontFamily: 'monospace',
        color: 'rgba(255,255,255,0.7)',
    },
    buttons: {
        ...StyleSheet.absoluteFillObject,
        top: 'auto',
        bottom: 100,
        paddingHorizontal: 28,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
    button: {
        backgroundColor: `rgba(0,0,0,0.7)`,
        padding: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
    },
})