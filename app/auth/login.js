import {View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator} from "react-native";
import React from "react";
import {Formik} from "formik";
import * as yup from "yup";
import {useRouter} from "expo-router";
import {useMutation} from "@tanstack/react-query";
import {loginUser} from "../(services)/api/api";
import {useDispatch, useSelector} from "react-redux";
import {loginUserAction} from "../(redux)/authSlice";

const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email is Required.').label("Email"),
    password: yup.string().required('Password is Required.').min(4, 'Password must be at least 4 characters.').label("Password")
});

const Login = () => {
    const mutation = useMutation({
        mutationFn: loginUser,
        mutationKey: ['login']
    });
    const dispatch = useDispatch();
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Login
            </Text>
            {mutation?.isError && <Text style={styles.errorText}>{mutation?.error?.response?.data?.detail || mutation?.error?.message}</Text>}
            <Formik
                initialValues={{email: 'test@gmail.com', password: 'testpass'}}
                onSubmit={(values) => {
                    mutation.mutateAsync(values).then((data) => {
                        dispatch(loginUserAction(data));
                        router.push("/(tabs)/home");
                    }).catch((error) => {});
                }}
                validationSchema={validationSchema}
            >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched
                }) => (
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                        />
                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            {mutation?.isPending ? (
                                <ActivityIndicator color="#fff" />
                                ):
                                <Text style={styles.buttonText}>
                                Login
                                </Text>
                            }
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default Login;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  form: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});