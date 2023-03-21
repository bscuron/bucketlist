import React, { useContext } from 'react';
import { Context } from '../App';
import { NativeBaseProvider, View, Text } from 'native-base';
import { theme } from './core/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { NavigationContainer } from '@react-navigation/native';
import { SignupScreen, LoginScreen, DatabaseScreen } from './screens';

const Stack = createNativeStackNavigator();

const linking = {
    prefixes: [Linking.createURL('/'), 'https://cis-linux2.temple.edu'],
    config: {
        screens: {
            Bucketlist: '/bucketlist',
            Signup: '/bucketlist/signup',
            Database: '/bucketlist/database'
        }
    }
};

const Main = () => {
    const { token, loadingContext } = useContext(Context);

    // TODO: replace returned component here with loading/splash screen
    if (loadingContext) {
        return (
            <NativeBaseProvider theme={theme}>
                <View>
                    <Text>
                        CHECKING FOR TOKEN IN ASYNC STORAGE, REPLACE ME WITH
                        LOADING SCREEN
                    </Text>
                </View>
            </NativeBaseProvider>
        );
    }

    return (
        <NavigationContainer linking={linking}>
            <NativeBaseProvider theme={theme}>
                <Stack.Navigator>
                    {!!token ? (
                        <>
                            <Stack.Screen
                                name="Database"
                                options={{ title: 'Bucketlist | Database' }}
                                component={DatabaseScreen}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name="Bucketlist"
                                options={{ title: 'Bucketlist | Login' }}
                                component={LoginScreen}
                            />
                            <Stack.Screen
                                name="Signup"
                                options={{ title: 'Bucketlist | Signup' }}
                                component={SignupScreen}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NativeBaseProvider>
        </NavigationContainer>
    );
};

export default Main;
