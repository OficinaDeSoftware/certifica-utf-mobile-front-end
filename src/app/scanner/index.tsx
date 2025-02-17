import { Camera, CameraView } from "expo-camera";
import { router, useLocalSearchParams } from 'expo-router';
import {
  AppState,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import Overlay from "@/src/app/scanner/overlay";
import { useEffect, useRef, useState } from "react";
import { useRequest } from "@/src/api/endpoint/certificautf/useRequest";
import BackStackScreenButton from "@/src/components/backstackscreenbutton";
import { CertificaUTFCheckinEndpoint } from "@/src/api/endpoint/certificautf/CertificaUTFCheckinEndpoint";

export default function Scanner() {
  const { checkin, idEvent } = useLocalSearchParams(); 
  const ischeckin = checkin == 'true';
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [status, setStatus] = useState(false);
  const { fetchApi } = useRequest();

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

  const handleCheckin: (nrUuid: string) => Promise<void> = async (nrUuid: string): Promise<void> => {
    await fetchApi({
      request: async (token) => {
        return new CertificaUTFCheckinEndpoint(token).checkin(idEvent as string, nrUuid);
      },
      onSuccess: (result: any) => {
        setStatus(true);
      },
    });
  };

  const handleCheckout: (nrUuid: string) => Promise<void> = async (nrUuid: string): Promise<void> => {
    await fetchApi({
      request: async (token) => {
        return new CertificaUTFCheckinEndpoint(token).checkout(idEvent as string, nrUuid);
      },
      onSuccess: (result: any) => {
        setStatus(true);
      },
    });
  };

  function validateCode(data: string): boolean {

    console.log("checkin = " + ischeckin);
    console.log(data);
    console.log(ischeckin);

    if (ischeckin) {
      handleCheckin(data);
    } else {
      handleCheckout(data);
    }

    if (status) {
      return true;
    } else {
      return false;
    }
  }
''
  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      
      <BackStackScreenButton />

      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (validateCode(data) && !qrLock.current) {
            qrLock.current = true;
            router.push({
              pathname: '/scanner/status',
              params: { status: String(true) },
            });
          } else {
            router.push({
              pathname: '/scanner/status',
              params: { status: String(false) },
            });
          }
          setStatus(false)
        }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
}