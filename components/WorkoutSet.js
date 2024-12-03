import {StyleSheet, View, Text} from "react-native";
import React from "react";

const WorkoutSet = () => {
    return (
        <View style={styles.container}>
            <Text>Hello</Text>
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