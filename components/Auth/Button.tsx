import Animated, { BounceInRight } from "react-native-reanimated";
import tw from "../../tailwind";
import { CustomButtonProps } from "../../types";
import { Text, View, TouchableOpacity } from "react-native";


function Button({ title, style, onPress, children, textStyle, disabled }: CustomButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <Animated.View
                entering={BounceInRight.delay(400).duration(1000).springify().damping(30).mass(5)}
                style={tw` colors rounded-full flex flex-row gap-3 justify-center items-center ${style}`}
            >
                {children}
                <Text style={tw`text-white text-xl ${textStyle}`}>{title}</Text>
            </Animated.View>
        </TouchableOpacity>
    );
}

export default Button