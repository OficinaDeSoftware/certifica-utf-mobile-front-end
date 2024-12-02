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
import BackStackScreenButton from "@/src/components/backstackscreenbutton";

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
      
      <BackStackScreenButton />

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