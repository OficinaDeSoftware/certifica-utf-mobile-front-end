import {InputLabel} from "@/src/components/inputlabel";
import {RegisterOptions} from "react-hook-form";
import {useState} from "react";

interface InputPasswordProps {
    label: string;
    name: string;
    placeholder?: string;
    rules?: RegisterOptions,
}

export function InputPassword( { label, name, placeholder, rules } : InputPasswordProps ) {

    const [ isSecurityType, setSecurityType ] =  useState<boolean>( true );

    const dsIconName = isSecurityType ? 'eye-off-outline' : 'eye-outline';

    return (
        <InputLabel
            label={label}
            name={name}
            placeholder={placeholder}
            rules={rules}
            secureTextEntry={isSecurityType}
            icon={dsIconName}
            onPressIcon={ () => setSecurityType( !isSecurityType ) }
        />
    )
}