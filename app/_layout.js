import {Stack} from "expo-router";
import queryClient from "./(services)/queryClient";
import {QueryClientProvider} from "@tanstack/react-query";
import AppWrapper from "./(redux)/AppWrapper";
import {Provider} from "react-redux";
import {store} from "./(redux)/store";

import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme, //1. Import this package
} from "react-native-paper";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

//3. Install deepmerge first and import it
import merge from "deepmerge";

import { Colors } from "../constants/Colors";
import {useColorScheme} from "react-native";

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

//4. The adaptNavigationTheme function takes an existing React Navigation
// theme and returns a React Navigation theme using the colors from
// Material Design 3.
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

//5.We will merge React Native Paper Theme and Expo Router Theme
// using deepmerge
const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export default function RootLayout() {
    const colorScheme = useColorScheme();

  //6. Let's use the merged themes
    const paperTheme =
      colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

    return (
        <Provider store={store}>
            <PaperProvider theme={paperTheme}>
                <ThemeProvider value={paperTheme}>
                    <QueryClientProvider client={queryClient}>
                        <AppWrapper />
                    </QueryClientProvider>
                </ThemeProvider>
            </PaperProvider>
        </Provider>
    )
}