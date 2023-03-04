import React, { memo, useState, useEffect } from 'react';
import { Navigation } from '../types';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import {
    Center,
    VStack,
    Box,
    Heading,
    Input,
    FormControl,
    Button,
    Progress
} from 'native-base';
import axios from 'axios';

type Props = {
    navigation: Navigation;
};

const SignupScreen = ({ navigation }: Props) => {
    const [data, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});

    // Create account using form data in our database
    const submit = () => {
        if (!validate()) return;

        axios
            .post('https://cis-linux2.temple.edu/bucketlistBackend/signup', {
                username: data.username,
                email: data.email,
                password: data.password
            })
            .then((res) => {
                navigation.navigate('DBScreen');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Validate user input. The same validation must be done on the server side.
    const validate = () => {
        // Username must be at least 6 characters long
        if (data.username === undefined || data.username.length < 6) {
            setErrors({
                ...errors,
                username: 'Your username must be at least 6 characters long'
            });
            return false;
        } else {
            delete errors.username;
        }

        // Match valid email
        const emailRegex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailRegex.test(data.email)) {
            setErrors({
                ...errors,
                email: 'Invalid email address'
            });
            return false;
        } else {
            delete errors.email;
        }

        /* Password should contain at least:
         *  1. one digit
         *  2. one lower case
         *  3. one upper case
         *  4. eight from the mentioned characters */
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/;
        if (data.password.match(passwordRegex) == null) {
            setErrors({
                ...errors,
                password:
                    'Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters'
            });
            return false;
        } else {
            delete errors.password;
        }

        // Check that passwords match
        if (data.confirmPassword != data.password) {
            setErrors({
                ...errors,
                confirmPassword: 'Passwords do not match'
            });
            return false;
        } else {
            delete errors.confirmPassword;
        }

        return true;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Center>
                    <Box safeArea p="2" w="90%" maxW="290" py="8">
                        <Heading size="xl">Welcome</Heading>
                        <Heading mt="1" size="sm">
                            Sign up to continue!
                        </Heading>
                        <VStack space={3} mt="5">
                            <FormControl
                                isRequired
                                isInvalid={'username' in errors}
                            >
                                <FormControl.Label>Username</FormControl.Label>
                                <Input
                                    size="lg"
                                    type="text"
                                    onChangeText={(value) =>
                                        setData({ ...data, username: value })
                                    }
                                />
                                <FormControl.ErrorMessage>
                                    {errors.username}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <FormControl
                                isRequired
                                isInvalid={'email' in errors}
                            >
                                <FormControl.Label>Email</FormControl.Label>
                                <Input
                                    size="lg"
                                    type="text"
                                    onChangeText={(value) =>
                                        setData({ ...data, email: value })
                                    }
                                />
                                <FormControl.ErrorMessage>
                                    {errors.email}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <FormControl
                                isRequired
                                isInvalid={'password' in errors}
                            >
                                <FormControl.Label>Password</FormControl.Label>
                                <Input
                                    size="lg"
                                    type="password"
                                    onChangeText={(value) =>
                                        setData({ ...data, password: value })
                                    }
                                />
                                <FormControl.ErrorMessage>
                                    {errors.password}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <FormControl
                                isRequired
                                isInvalid={'confirmPassword' in errors}
                            >
                                <FormControl.Label>
                                    Confirm Password
                                </FormControl.Label>
                                <Input
                                    size="lg"
                                    type="password"
                                    onChangeText={(value) =>
                                        setData({
                                            ...data,
                                            confirmPassword: value
                                        })
                                    }
                                />
                                <FormControl.ErrorMessage>
                                    {errors.confirmPassword}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <Button
                                onPress={submit}
                                mt="2"
                                colorScheme="indigo"
                            >
                                Sign up
                            </Button>
                        </VStack>
                    </Box>
                </Center>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default memo(SignupScreen);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center'
    }
});
