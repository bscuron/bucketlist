import React, { memo, useState, useEffect } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image
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
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { position } from 'native-base/lib/typescript/theme/styled-system';

/**
 * Type for signup form data
 */
type FormData = {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

/**
 * Screen component for signup screen
 *
 * @param {Props} Props passed to component
 */

const SignupScreen = () => {
    const [data, setData] = useState<FormData>({});
    const [errors, setErrors] = useState<FormData>({});
    const navigation = useNavigation();

    /**
     * Submit user inputted data to backend for account creation
     */
    const submit = () => {
        if (!validate()) return;

        axios
            .post('https://cis-linux2.temple.edu/bucketlistBackend/signup', {
                username: data.username,
                email: data.email,
                password: data.password
            })
            .then((res) => {
                navigation.navigate('Database');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /**
     * Validates user input data submitted into signup form
     *
     * @returns {boolean} Determines whether or not user data is valid
     */
    const validate = (): boolean => {
        return (
            validateUsername(data.username) &&
            validateEmail(data.email) &&
            validatePasswords(data.password, data.confirmPassword)
        );
    };

    /**
     * Validates username that user inputted is valid
     *
     * @param {string} username - username to check
     * @returns {boolean} Whether or not the username is valid
     */
    const validateUsername = (username: string): boolean => {
        // Confirm that username is at least six characters long
        if (username === undefined || username.length < 6) {
            setErrors({
                ...errors,
                username: 'Your username must be at least 6 characters long'
            });
            return false;
        }

        // Check if username exists in database already
        axios
            .get(
                `https://cis-linux2.temple.edu/bucketlistBackend/database/user/${username}`
            )
            .then((res) => {
                if (res.data.rows.length > 0) {
                    setErrors({
                        ...errors,
                        username: 'Username is already taken'
                    });
                    return false;
                }
            })
            .catch((error) => {
                throw error;
            });

        delete errors.username;
        return true;
    };

    /**
     * Validates email that user inputted is valid
     *
     * @param {string} email - email to check
     * @returns {boolean} Whether or not the email is valid
     */
    const validateEmail = (email: string): boolean => {
        // Regex to match valid email address
        const emailRegex: RegExp =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (email === undefined || !emailRegex.test(email)) {
            setErrors({
                ...errors,
                email: 'Invalid email address'
            });
            return false;
        }

        // Check if username exists in database already
        axios
            .get(
                `https://cis-linux2.temple.edu/bucketlistBackend/database/email/${email}`
            )
            .then((res) => {
                if (res.data.rows.length > 0) {
                    setErrors({
                        ...errors,
                        email: 'Email is already being used by another account'
                    });
                    return false;
                }
            })
            .catch((error) => {
                throw error;
            });

        delete errors.email;
        return true;
    };

    /**
     * Validates password that user inputted is valid
     *
     * @param {string} password - password to check
     * @returns {boolean} Whether or not the password is email
     */
    const validatePasswords = (
        password: string,
        confirmPassword: string
    ): boolean => {
        let tmp: object = {};
        let valid: boolean = true;

        /* Password should contain at least:
         *  1. one digit
         *  2. one lower case
         *  3. one upper case
         *  4. eight from the mentioned characters */
        const passwordRegex: RegExp =
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/;

        if (password === undefined || password.match(passwordRegex) == null) {
            tmp.password =
                'Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters';
            valid = false;
        } else {
            delete errors.password;
        }

        if (password != confirmPassword) {
            tmp.confirmPassword = 'Passwords do not match';
            valid = false;
        } else {
            delete errors.confirmPassword;
        }

        setErrors({
            ...errors,
            ...tmp
        });

        return valid;
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
                                    onChangeText={(value) => {
                                        setData({ ...data, username: value });
                                        validateUsername(value);
                                    }}
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
                                    onChangeText={(value) => {
                                        setData({ ...data, email: value });
                                        validateEmail(value);
                                    }}
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
                                    onChangeText={(value) => {
                                        setData({ ...data, password: value });
                                        validatePasswords(
                                            value,
                                            data.confirmPassword
                                        );
                                    }}
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
                                    onChangeText={(value) => {
                                        setData({
                                            ...data,
                                            confirmPassword: value
                                        });
                                        validatePasswords(data.password, value);
                                    }}
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
                        <Image
                    
                                source={require('../../assets/IconTransparent.png')}
                                style={[styles.container, styles.imageContainer]}
                            />
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
    },
    imageContainer:{
        position:'relative',
        width: 100, 
        height: 100,
        alignSelf: 'center'
    }
});

