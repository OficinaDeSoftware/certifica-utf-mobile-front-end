import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import {useRequest} from "@/src/api/endpoint/certificautf/useRequest";
import {CertificaUTFEventEndpoint} from "@/src/api/endpoint/certificautf/CertificaUTFEventEndpoint";

export default function EventList() {

    const { isLoading, error, fetchApi } = useRequest();
    const [ events, setEvents ] = useState<[]>([]);

    const handleEvents: () => Promise<void> = async(): Promise<void> => {
        await fetchApi(
            {
                request: async ( token) => {
                    return new CertificaUTFEventEndpoint( token ).findAll();
                },
                onSuccess: ( result: any ) => {
                    console.log( result );
                    setEvents( result )
                }
            }
        )
    }

    useEffect(() => {
        handleEvents();
    }, [])

    return (
        <View>
            <Text>EventList</Text>
        </View>
    )
}