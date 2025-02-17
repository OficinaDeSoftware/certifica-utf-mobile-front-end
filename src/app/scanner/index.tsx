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
import { useCallback, useEffect, useRef, useState } from "react";
import { useRequest } from "@/src/api/endpoint/certificautf/useRequest";
import BackStackScreenButton from "@/src/components/backstackscreenbutton";
import { CertificaUTFCheckinEndpoint } from "@/src/api/endpoint/certificautf/CertificaUTFCheckinEndpoint";
import debounce from 'lodash/debounce';

export default function Scanner() {

  const { checkin, idEvent } = useLocalSearchParams(); 
  const ischeckin = checkin == 'true';
  const appState = useRef(AppState.currentState);
  const { fetchApi } = useRequest();
  const isLock = useRef(false);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) 
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleCheckin: (nrUuid: string) => Promise<boolean> = async (nrUuid: string): Promise<boolean> => {
    return await fetchApi({
      request: async (token) => {
        return new CertificaUTFCheckinEndpoint(token).checkin(idEvent as string, nrUuid);
      },
      onSuccess: (result: any) => {
        console.log("Sucesso ao efetuar checkin!")
      },
    });
  };

  const handleCheckout: (nrUuid: string) => Promise<boolean> = async (nrUuid: string): Promise<boolean> => {
    return await fetchApi({
      request: async (token) => {
        return new CertificaUTFCheckinEndpoint(token).checkout(idEvent as string, nrUuid);
      },
      onSuccess: (result: any) => {
        console.log("Sucesso ao efetuar checkout!")
      },
    });
  };

  async function onScannerCodeRead( event : any ) {

      console.log( event.data )
      
      if( isLock.current ) {
        return;
      }

      isLock.current = true;

      const isSuccess = await validateCode( event.data );

      if( isSuccess ) {

        router.push({
          pathname: '/scanner/status',
          params: { status: String(true), checkin },
        });

        return;
      }

      router.push({
        pathname: '/scanner/status',
        params: { status: String(false), checkin },
      });
 
      isLock.current = false;

  }

  const debouncedOnBarCodeRead = useCallback(debounce(onScannerCodeRead, 1000), []);

  async function validateCode(data: string): Promise<boolean> {

    if (ischeckin) {
      return await handleCheckin(data);
    }

    return await handleCheckout(data);
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      
      <BackStackScreenButton />

      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={debouncedOnBarCodeRead}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
}