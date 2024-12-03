import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { api } from '../../(services)/api/api.js';
import {Button, Card} from "react-native-paper";

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
            <Text style={styles.title}>Start a Workout</Text>
            <Button onPress={createWorkout} mode="contained">Create Workout</Button>
            <View style={styles.cardList}>
                {workouts.map((workout) => (
                    <TouchableOpacity key={workout.id} onPress={() => router.push({
                        pathname: "/workouts/[id]",
                        params: {
                            id: workout.id
                        }
                    })}>
                        <Card>
                            <Card.Title title={`Workout ${workout.id}`} subtitle={`Past workout`} />
                            <Card.Content>
                                <Text>
                                    Some test content
                                </Text>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default Workouts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 16,
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
    cardList: {
        flex: 1,
        padding: 24,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 24
    }
});