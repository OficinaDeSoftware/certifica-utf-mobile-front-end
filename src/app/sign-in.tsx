import { Text, TouchableOpacity, View } from 'react-native';

import { useSession } from '@/src/hooks/auth';
import { InputLabel } from "@/src/components/inputlabel";
import { useForm, FormProvider } from "react-hook-form"
import { ErrorMessage } from "@/src/components/errormessage";
import { StyledButton } from "@/src/components/styledbutton";

import { InputPassword } from "@/src/components/inputpassword";
import { Ionicons } from "@expo/vector-icons";

export default function SignIn() {

    const { signIn, error, isLoading } = useSession();

    const onSubmit = ( { ra, password } : any ) => signIn( ra, password );

    const methods = useForm({
        defaultValues: {
            ra: '',
            password: ''
        }
    })

    return (
      <FormProvider {...methods}>
            <View className='flex h-full w-full items-center justify-center bg-neutral-700'>
            <View className="w-full h-full p-10 justify-evenly gap-5 flex">
                <Text className="text-white text-5xl text-center ">CertificaUTF</Text>
                <View className="flex flex-col gap-8">
                    <View className="flex flex-col gap-2">
                        <InputLabel
                            label="RA"
                            name="ra"
                            placeholder="Digite seu RA"
                            rules={
                                {
                                    required: "RA é obrigatório",
                                    maxLength: {
                                        value: 20,
                                        message: 'Tamanho maior que o permitido',
                                    },
                                }
                            }
                        />
                        <InputPassword
                            label="Senha"
                            name="password"
                            placeholder="Digite sua senha"
                            rules={
                                {
                                    required: "Senha é obrigatório",
                                    maxLength: {
                                        value: 20,
                                        message: 'Tamanho maior que o permitido',
                                    },
                                }
                            }
                        />
                    </View>
                    { error && <ErrorMessage message={error} />}
                    <StyledButton
                        onPress={methods.handleSubmit(onSubmit)}
                        isLoading={isLoading}>
                        Entrar
                    </StyledButton>
                   {/*TODO alterar para usar o button do provider.*/}
                    {/* <TouchableOpacity className="bg-white rounded-full flex flex-row justify-center items-center h-14 gap-2">
                        <Ionicons name="logo-google" size={24} color="black" />
                        <Text>Continuar com o Google</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
      </FormProvider>
  );
}