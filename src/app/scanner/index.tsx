import { Camera, CameraView } from "expo-camera";
import { router } from 'expo-router';
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Pressable,
} from "react-native";
import Overlay from "@/src/app/scanner/overlay";
import { useEffect, useRef } from "react";
import { Ionicons, Feather } from '@expo/vector-icons'

export default function Scanner() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <Pressable
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: 28,
          left: 28,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 10,
          borderRadius: 10,
          padding: 4,
        }}
      >
        <Ionicons name="chevron-back" size={40} color="white" />
      </Pressable>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async () => {
              await Linking.openURL(data);
            }, 500);
          }
        }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
}