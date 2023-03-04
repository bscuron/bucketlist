import React, { memo, useState, useEffect } from 'react';
import { Navigation } from '../types';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import {
    Center,
    VStack,
    Box,
    Heading,
    Input,
    FormControl,
    Button,
    WarningOutlineIcon
} from 'native-base';
import axios from 'axios';

type Props = {
    navigation: Navigation;
};

const SignupScreen = ({ navigation }: Props) => {
    const [formData, setData] = React.useState({});
    const [formErrors, setErrors] = React.useState({});

    const submit = () => {
        if (!validate()) return;

        axios
            .post('https://cis-linux2.temple.edu/bucketlistBackend/signup', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            })
            .then((res) => {
                navigation.navigate('DBScreen');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const validate = () => {
        // TODO: validate user input

        return true;
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Center>
                <Box safeArea p="2" w="90%" maxW="290" py="8">
                    <Heading size="xl">Welcome</Heading>
                    <Heading mt="1" size="sm">
                        Sign up to continue!
                    </Heading>
                    <VStack space={3} mt="5">
                        <FormControl isRequired>
                            <FormControl.Label>Username</FormControl.Label>
                            <Input
                                size="lg"
                                type="text"
                                onChangeText={(value) =>
                                    setData({ ...formData, username: value })
                                }
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input
                                size="lg"
                                type="text"
                                onChangeText={(value) =>
                                    setData({ ...formData, email: value })
                                }
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input
                                size="lg"
                                type="password"
                                onChangeText={(value) =>
                                    setData({ ...formData, password: value })
                                }
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>
                                Confirm Password
                            </FormControl.Label>
                            <Input
                                size="lg"
                                type="password"
                                onChangeText={(value) =>
                                    setData({
                                        ...formData,
                                        confirmPassword: value
                                    })
                                }
                            />
                        </FormControl>

                        <Button onPress={submit} mt="2" colorScheme="indigo">
                            Sign up
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </KeyboardAvoidingView>
    );
};

export default memo(SignupScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});
