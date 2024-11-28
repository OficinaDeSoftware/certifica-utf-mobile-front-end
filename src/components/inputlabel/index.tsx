import { Text, TextInput, View } from "react-native"
import { useFormContext, RegisterOptions, FieldValue, FieldErrors } from "react-hook-form";

interface InputLabelProps {
    label: string;
    name: string;
    placeholder?: string;
    rules?: RegisterOptions
}

export function InputLabel({ label, name, placeholder, rules  } : InputLabelProps ) {

    const { register, setValue, formState: { errors } } = useFormContext<any>();

    return (
        <View className="flex flex-column gap-2 font-bold">
            <Text className="text-white">{ label }</Text>
            <TextInput
                {...register(name, rules)}
                placeholder={placeholder}
                onChangeText={ ( text) => setValue( name, text, { shouldValidate: true }) }
                placeholderTextColor="#c5c5c5"
                className="text-white bg-neutral-700 border-2 border-purple-500 rounded h-14 p-4"
            />
            { errors[name] && <Text className="text-red-400 break-normal">{ ( errors[name] as any )?.message }</Text>}
        </View>
    );
}