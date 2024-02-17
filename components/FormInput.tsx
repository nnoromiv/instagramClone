import React from 'react'
import { Image, TextInput, View } from 'react-native'
import { FormInputProps } from '../types'
import tw from '../tailwind'

/* The code is defining a functional component called `FormInput` using TypeScript and React. */
const FormInput: React.FC<FormInputProps> = (
    {
        logic,
        sourceError,
        source,
        placeholder,
        keyboardType,
        textContentType,
        onChangeText,
        onBlur,
        value,
        secureTextEntry,
        maxLength,
        styles
    }) => {
    return (
        /* The code you provided is a React component called `FormInput`. It renders a `View` component
        that contains an `Image` component and a `TextInput` component. */
        <View style={tw`flex justify-center mt-3`}>
            {
                source === undefined && sourceError === undefined
                    ? <></> :
                    <Image src={logic ? sourceError : source}
                        style={tw`w-[25px] h-[25px] absolute z-2 mx-3`}
                    />
            }
            <TextInput
                placeholder={placeholder} autoCapitalize={"none"}
                placeholderTextColor={'#0f000f'}
                keyboardType={keyboardType} textContentType={textContentType}
                onChangeText={onChangeText} onBlur={onBlur}
                value={value}
                secureTextEntry={secureTextEntry}
                maxLength={maxLength}
                style={tw` ${styles === '' ? 'bg-[#d3d3d3] py-5' : styles} text-lg rounded-lg font-semibold pl-12 z-1 
                ${logic === undefined ? 'pl-5' : logic ? 'pl-5' : 'pl-5 bg-[#ffd6d6]'} ` }
            />
        </View>
    )
}

export default FormInput