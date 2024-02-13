import { ReactNode } from "react";

// Example Type Style
export interface CustomButtonProps {
    children?: ReactNode
    title: string
    style?: any,
    textStyle?: any
    onPress?: () => void
};
