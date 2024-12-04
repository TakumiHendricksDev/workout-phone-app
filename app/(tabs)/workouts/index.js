import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { api } from '../../(services)/api/api.js';
import {Button, List} from "react-native-paper";

const Workouts = () => {
    const router = useRouter();

    const [workouts, setWorkouts] = useState([]);

    async function createWorkout() {
        try {
            const response = await api.post("/api/workouts/", {
                start_at: Date.now(),
            });
            router.push({
                pathname: "/workouts/[id]",
                params: { id: response.data.id },
            });
        } catch (error) {
            console.log(error.response.data.detail);
        }
    }

    useEffect(() => {
        async function getWorkouts() {
            try {
                const response = await api.get("/api/workouts/");
                setWorkouts(response.data);
            } catch (error) {
                console.log(error.response.data.detail);
            }
        }
        getWorkouts();
    }, []);

    return (
        <View style={styles.container}>
            <View style = {styles.middleContainer}>
                <Text style={styles.title}>Start a Workout</Text>
                <Button onPress={createWorkout} mode="contained">Create Workout</Button>
            </View>
            <View>
                <List.Section title="Workouts">
                {workouts.map((workout) => (
                    <List.Item
                        title={workout.name}
                        key={workout.id}
                        description={new Date(workout.start_at).toLocaleString()}
                        onPress={() => router.push({
                            pathname: "/workouts/[id]",
                            params: {
                                id: workout.id
                            }
                        })}
                    ></List.Item>
                ))}
                </List.Section>
            </View>
        </View>
    );
};

export default Workouts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    middleContainer: {
        flex: 1,
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginVertical: 24,
    },
    button: {
        height: 50,
        backgroundColor: "#6200ea",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});