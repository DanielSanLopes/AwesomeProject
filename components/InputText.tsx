import { Input, Text, Link, FormControl, Box} from "native-base"
import { useEffect, useState } from "react";
import { View, TextInput, NativeSyntheticEvent, TextInputFocusEventData} from "react-native";



type InputTextProps = {
    
    isInvalid?: boolean;
    placeholder?: string;
    label?: string;
    hidden?: boolean;
    onChangeText?: (text: string) => void;
    onBlur?: any
    theme: 'light' | 'dark';
    errorMessage?: string;
    value?: string;
    control?: any;
    handleSubmit?: any
};

const InputText = (props:InputTextProps) => {
    const [borderColor, setBorderColor] = useState<'black' | 'gray' | 'red' | 'blue'>('black');



    useEffect(() => {
        if (props.isInvalid) {
            setBorderColor('red');
        }
    }
    , [props.isInvalid]);
    
    return(
    <FormControl  isInvalid={props.isInvalid}>
        <FormControl.Label >{props.label}</FormControl.Label>
        <TextInput style={{
            borderWidth:1,
            borderColor:borderColor, 
            borderRadius:10,
            backgroundColor:props.theme == 'dark'? 'gray':'white',
            padding:10,}}

            onFocus={() => setBorderColor('blue')}
            onBlur={(event) => {setBorderColor('black'); props.onBlur(event)}} 
            placeholder={props.placeholder || 'Digite aqui...'}
            placeholderTextColor={props.theme == 'dark' ? 'lightgray' : 'gray'}
            secureTextEntry={props.hidden}

            onChangeText={props.onChangeText}
            value={props.value}
            />
        <FormControl.ErrorMessage>
            {props.errorMessage || 'Campo inválido'}
        </FormControl.ErrorMessage>
    </FormControl>       
    )
}


export default InputText