import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { theme } from './src/core/theme';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignupScreen, DatabaseScreen } from './src/screens';
import * as Linking from 'expo-linking';

const Stack = createNativeStackNavigator();

/* FIXME: URL routing via the address bar only works on localhost (on
 * my machine). It does not work correctly on the linux server. I think
 * it might be a problem with the apache redirection we are currently
 * using. */
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

const Main = () => (
    <NavigationContainer linking={linking}>
        <NativeBaseProvider theme={theme}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Bucketlist"
                    options={{ title: 'Bucketlist | Home' }}
                    component={SignupScreen}
                />
                <Stack.Screen
                    name="Signup"
                    options={{ title: 'Bucketlist | Signup' }}
                    component={SignupScreen}
                />
                <Stack.Screen
                    name="Database"
                    options={{ title: 'Bucketlist | Database' }}
                    component={DatabaseScreen}
                />
            </Stack.Navigator>
        </NativeBaseProvider>
    </NavigationContainer>
);

export default Main;
