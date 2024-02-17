# TypeScript React Native & Tailwind CSS

This is a new [**TypeScript React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli) integrated with Tailwind CSS functionalities from [**Tailwind React Native Classnames**](https://github.com/jaredh159/tailwind-react-native-classnames).

## Getting Started

## Step 1: Clone Repository

```bash
   git clone https://github.com/nnoromiv/Instagram.git
```

## Step 2: Delete existing `.git` file

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

>**Dependencies**: To install all dependencies run

```bash
   cd Instagram
```

```bash
# using npm
   npm install

# OR using Yarn
   yarn add 
```

## Step 3: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
   npm start

# OR using Yarn
   yarn start
```

## Step 4: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 5: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `Home.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Step 6: Using the Tailwind

```ts

   import tw from './tailwind'; // The import is relative to your file structure

   const MyComponent = () => (
   <View style={tw`p-4 android:pt-2 bg-white dark:bg-black`}>
      <Text style={tw`text-md text-black dark:text-white`}>Hello World</Text>
   </View>
   );

```

## Features

- Stack Navigation library.
- Tailwind by TWRNC see more detail from the links provided below

[**Jared Henderson Profile**](https://github.com/jaredh159)

[**Visit the Official Tailwind React Native Classname by Jared Henderson**](https://github.com/jaredh159/tailwind-react-native-classnames)

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

## Troubleshooting React Native

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Learn More about React Native

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
