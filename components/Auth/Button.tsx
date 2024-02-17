import tw from "../../tailwind";
import { CustomButtonProps } from "../../types";
import { Text, View, TouchableOpacity } from "react-native";


function Button({ title, style, onPress, children, textStyle, disabled }: CustomButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={tw` colors rounded-full flex flex-row gap-3 justify-center items-center ${style}`} >
                {children}
                <Text style={tw`text-white text-xl ${textStyle}`}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Button