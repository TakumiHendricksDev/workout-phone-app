import {View, StyleSheet, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {useLocalSearchParams} from "expo-router";
import {api} from "../../(services)/api/api";
import {Button, Modal, Portal, Title, Text, List} from "react-native-paper";
import WorkoutSet from "../../../components/WorkoutSet";

const Workout = () => {
    const {id} = useLocalSearchParams();
    const [workout, setWorkout] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const [workoutExercises, setWorkoutExercises] = useState([]);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    async function createWorkoutExercise(exercise_id) {
        try {
            const response = await api.post(`/api/workouts/workout_exercise/`, {
                exercise_id: exercise_id,
                workout_id: id,
            });
            setWorkoutExercises([...workoutExercises, response.data]);
        } catch (error) {
            console.log(error);
        }
        hideModal();
    }

    useEffect(() => {
        async function getWorkout() {
            try {
                const response = await api.get(`/api/workouts/${id}/`);
                setWorkout(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        async function getExercises() {
            try {
                const response = await api.get('/api/workouts/exercises/');
                setExercises(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        async function getWorkoutExercises() {
            try {
                const response = await api.get(`/api/workouts/${id}/exercises/`);
                setWorkoutExercises(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getWorkout();
        getExercises();
    }, []);

    return (
        <View style={styles.container}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    {exercises.map((exercise) => (
                        <TouchableOpacity key={exercise.id} onPress={() => createWorkoutExercise(exercise.id)}>
                            <List.Item title={exercise.name} description={exercise.muscle_groups} />
                        </TouchableOpacity>
                    ))}
                </Modal>
            </Portal>

            <Title>{workout?.name}</Title>
            {workoutExercises.map((workoutExercise) => (
                <WorkoutSet key={workoutExercise.id} workout_exercise_id={workoutExercise.id} />
            ))}
            <Button mode={"contained"} onPress={showModal}>Add Exercises</Button>
            <Button mode={"contained"}>Cancel Workout</Button>
        </View>
    );
}

export default Workout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 16,
    },
});