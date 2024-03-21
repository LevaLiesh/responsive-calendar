import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { type JSX, useCallback } from "react"
import { StyleSheet, Text, View } from "react-native"

import Calendar from "./src/components/Calendar"
import { MARGIN_X } from "./src/core/constants"

SplashScreen.preventAutoHideAsync()

export default function App(): JSX.Element | null {
  const [isLoaded] = useFonts({
    "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "poppins-semibold": require("./assets/fonts/Poppins-SemiBold.ttf")
  })

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [isLoaded])

  if (!isLoaded) {
    return null
  }

  return (
    <View onLayout={handleOnLayout} style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
      <Calendar />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    alignSelf: "flex-start",
    fontFamily: "poppins-semibold",
    fontSize: 32,
    color: "#fff"
  },
  container: {
    flex: 1,
    backgroundColor: "#030303",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: MARGIN_X
  }
})
