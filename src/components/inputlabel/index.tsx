import { Text, TextInput, View } from "react-native"
import { useFormContext, RegisterOptions, FieldValue, FieldErrors } from "react-hook-form";
import Ionicons from '@expo/vector-icons/Ionicons';

interface InputLabelProps {
    label: string;
    name: string;
    placeholder?: string;
    rules?: RegisterOptions,
    icon?: any;
    secureTextEntry?: boolean
    onPressIcon?: () => void;
}

export function InputLabel({ label, name, placeholder, rules, icon, secureTextEntry, onPressIcon } : InputLabelProps ) {

    const { register, setValue, formState: { errors } } = useFormContext<any>();

    return (
        <View className="flex flex-column gap-2 font-bold">
            <Text className="text-white">{label}</Text>
            <View className="flex flex-row items-center bg-neutral-700 border-2 border-purple-500 rounded h-14 p-4">
                <TextInput
                    {...register(name, rules)}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    onChangeText={(text) => setValue(name, text, { shouldValidate: true })}
                    placeholderTextColor="#c5c5c5"
                    className="text-white flex-grow h-14"
                />
                { icon && <Ionicons name={icon} size={20} color="#a1a1aa" onPress={onPressIcon} />}
            </View>
            {errors[name] && <Text className="text-red-400 break-normal">{(errors[name] as any)?.message}</Text>}
        </View>
    );
}