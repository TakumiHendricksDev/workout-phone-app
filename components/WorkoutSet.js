import {StyleSheet, View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import {api} from "../app/(services)/api/api";

const WorkoutSet = ({workout_exercise_id}) => {
    const [workoutExercise, setWorkoutExercise] = useState([]);
    const [exercise, setExercise] = useState([]);

    useEffect(() => {
        async function getWorkoutExercise() {
            try {
                const response = await api.get(`/api/workouts/workout_exercise/${workout_exercise_id}/`);
                setWorkoutExercise(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        async function getExercise() {
            try {
                const response = await api.get(`/api/workouts/exercise/${workoutExercise.exercise_id}/`);
                setExercise(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getWorkoutExercise();
        getExercise();
    }, []);
    return (
        <View style={styles.container}>
            <Text>{exercise.name}</Text>
        </View>
    )
}

export default WorkoutSet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 16,
    },
});