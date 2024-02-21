import { DocumentData } from "firebase/firestore";
import { ChangeEvent , ReactNode } from "react";
import { ImageSourcePropType, KeyboardTypeOptions } from "react-native";
import { Source } from "react-native-fast-image";

type textContentType =
    'none' | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'creditCardExpiration'
    | 'creditCardExpirationMonth'
    | 'creditCardExpirationYear'
    | 'creditCardSecurityCode'
    | 'creditCardType'
    | 'creditCardName'
    | 'creditCardGivenName'
    | 'creditCardMiddleName'
    | 'creditCardFamilyName'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
    | 'birthdate'
    | 'birthdateDay'
    | 'birthdateMonth'
    | 'birthdateYear'
    | undefined

export type Likes = {
    email: string
    like: boolean
}
export interface LogoProps {
    styles: string
    image?: number | Source | undefined
    onPress?: () => void
    onLongPress?: () => void
}
export interface CustomButtonProps {
    children?: ReactNode
    title: string
    style?: any
    textStyle?: any
    onPress?: () => void
    disabled?: boolean
};

export interface FormInputProps {
    logic?: any
    sourceError?: string
    source?: string
    placeholder: string
    keyboardType?: KeyboardTypeOptions | undefined
    textContentType: textContentType | undefined
    onChangeText: (e: string | ChangeEvent<any>) => void
    onBlur?: (e: any) => void
    value: string
    secureTextEntry?: boolean
    maxLength?: number
    styles: string,
    isMessage?: boolean
}

export interface IconProps {
    navigation: any
    style: string
    urlSource: string
    text?: number
    onPress?: () => void
}

export interface StoryProps {
    navigation: any
    profilePicture?: string
    story: DocumentData[] | null
    currentUser: string
    mergedStory: any[] | undefined
}

export interface PostProps {
    post: DocumentData[] | null
    handleModal: () => void
    setPostInfo: React.Dispatch<React.SetStateAction<DocumentData | undefined>>
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

export interface StoryCardProps {
    navigation: any
    imageUrl: string | undefined
    storyType: 'user' | 'others'
    name: string
    onPress?: () => void
}

export interface PostHeaderProps {
    imageUrl: string
    userName: string
}

export interface PostCardProps {
    imageUrl: string
    userName: string
    numberOfLikes: number
    caption: string
    postImage: string
    numberOfComments: number
    navigation?: any
    likes: Likes[]
    postOwner: string
    postId: string
    handleModal: () => void
    setPostInfo: React.Dispatch<React.SetStateAction<DocumentData | undefined>>
    post: DocumentData[] | null
}

export interface BottomTabProps {
    navigation: any
    profilePicture?: string
}

export interface AuthProps {
    userName?: string
    email: string
    password: string
}

export interface ErrorProps {
    message: string
}

export interface HeaderProps {
    navigation: any,
}


export interface postSubmittedProps {
    postType: string
    image: string | undefined
    caption: string
}

export interface CreatePostHeaderProps {
    navigation: any
    addPostOnPress: () => void
}

export interface CreatePostCreateProps {
    navigation: any
    paramPostType: string
}

export interface CreatePostUploaderProps {
    navigation: any
    paramPostType: string
}

export interface FooterProps {
    navigation: any
    likes: Likes[]
    postOwner: string
    postId: string
    setPostInfo: React.Dispatch<React.SetStateAction<DocumentData | undefined>>
    handleModal: () => void
    post: DocumentData[] | null
}

export interface CommentsProps {
    isModal: boolean
    handleModal: () => void
    comment: DocumentData | undefined
}

export interface LoadingProps {
    load: boolean
}

export interface ModalNotificationProps {
    visible: boolean
    children: ReactNode
    status: 'success' | 'error' | 'notification' |string
}

export interface MessengerProps {
    navigation: any,
}

export interface MessengerHeaderProps {
    navigation: any
    currentUser: string
    profilePicture: string
}

export interface MessageCardProps {
    navigation: any
    messengerProfilePicture: string
    messengerName : string
    onPress: () => void
}

export interface ChatProps {
    route: any
    navigation: any
}

export interface ChatBodyProps {
    picture: string
    name: string
    body: string
    time: string
    user: 'user' | 'other'
}

export interface ChatInputProps {
    userInformation: DocumentData | null
    item : DocumentData | null
}

export interface storyProps {
    _uid: string
    caption: string
    comments: [], 
    createdAt: [Object], 
    imageUrl: [[Object]], 
    likes: [], 
    ownerEmail: string
    profilePicture: string, 
    username: string
}