import { View, Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import {useRequest} from "@/src/api/endpoint/certificautf/useRequest";
import {CertificaUTFEventEndpoint} from "@/src/api/endpoint/certificautf/CertificaUTFEventEndpoint";
import { router } from 'expo-router';

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
                    setEvents( result )
                }
            }
        )
    }

    useEffect(() => {
        handleEvents();
    }, [])

    return (
        <View className="flex-1 items-center justify-center">
            <Text>EventList</Text>

            <TouchableOpacity onPress={() => router.push({
                    pathname: '/event/detail/[id]',
                    params: {
                        id: 1
                    }
                })}
            >
                <Text>Go to Detail</Text>
            </TouchableOpacity>
        </View>
    )
}