import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function BackStackScreenButton() {
  return (
  	  <Pressable
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: 40,
          left: 28,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 10,
          borderRadius: 10,
          padding: 4,
        }}
      >
        <Ionicons name="chevron-back" size={40} color="white" />
      </Pressable>
  )
}