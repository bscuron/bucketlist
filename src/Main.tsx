import React, { useContext } from 'react';
import { Context } from '../App';
import { NativeBaseProvider } from 'native-base';
import { theme } from './core/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { NavigationContainer } from '@react-navigation/native';
import {
    SignupScreen,
    LoginScreen,
    DatabaseScreen,
    LoadingScreen
} from './screens';

const Stack = createNativeStackNavigator();

type ScreenMap = {
    [key: string]: { url: string; component: React.FunctionComponent };
};

/**
 * Screens that do not require a JWT
 */
export const unprotectedScreens: ScreenMap = {
    Login: {
        url: '/bucketlist/login',
        component: LoginScreen
    },
    Signup: {
        url: '/bucketlist/signup',
        component: SignupScreen
    }
};

/**
 * Screens that require a JWT (authentication)
 */
export const protectedScreens: ScreenMap = {
    Database: {
        url: '/bucketlist/database',
        component: DatabaseScreen
    },
    // TODO: remove this placeholder
    Placeholder: {
        url: '/bucketlist/placeholder',
        component: DatabaseScreen
    }
};

const linking = {
    prefixes: [Linking.createURL('/'), 'https://cis-linux2.temple.edu'],
    config: {
        screens: {
            ...Object.keys(unprotectedScreens).reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: unprotectedScreens[key].url
                }),
                {}
            ),
            ...Object.keys(protectedScreens).reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: protectedScreens[key].url
                }),
                {}
            )
        }
    }
};

const Main = () => {
    const { token, loadingContext } = useContext(Context);

    if (loadingContext) {
        return <LoadingScreen />;
    }

    return (
        <NavigationContainer linking={linking}>
            <NativeBaseProvider theme={theme}>
                <Stack.Navigator>
                    {!!token ? (
                        <>
                            {Object.keys(protectedScreens).map((screen) => (
                                <Stack.Screen
                                    name={screen}
                                    options={{
                                        title: `Bucketlist | ${screen}`
                                    }}
                                    component={
                                        protectedScreens[screen].component
                                    }
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            {Object.keys(unprotectedScreens).map((screen) => (
                                <Stack.Screen
                                    name={screen}
                                    options={{
                                        title: `Bucketlist | ${screen}`
                                    }}
                                    component={
                                        unprotectedScreens[screen].component
                                    }
                                />
                            ))}
                        </>
                    )}
                </Stack.Navigator>
            </NativeBaseProvider>
        </NavigationContainer>
    );
};

export default Main;
