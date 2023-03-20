import React, { memo, useState } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import {
    Center,
    VStack,
    HStack,
    Box,
    Heading,
    Input,
    FormControl,
    Button,
    Text,
    Alert,
    IconButton,
    CloseIcon
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

/**
 * Type for login form data
 */
type FormData = {
    username?: string;
    password?: string;
    code?: string;
};

/**
 * Screen component for login screen
 */
const LoginScreen = () => {
    const [data, setData] = useState<FormData>({});
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const navigation = useNavigation();

    /**
     * Submit user inputted data to backend for login authentication
     */
    const submit = async () => {
        let result;

        try {
            result = await axios.post(
                'https://cis-linux2.temple.edu/bucketlistBackend/login',
                {
                    username: data.username,
                    password: data.password,
                    code: data.code
                }
            );
        } catch (error) {
            setShowAlert(true);
            return;
        }

        // Successful login
        setShowAlert(false);

        // Add authorization token to global request headers
        const jwt: string = result.data.token;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
        navigation.navigate('Database'); // TODO: navigate to one of the protected routes
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
                            Please log in!
                        </Heading>
                        <VStack space={3} mt="5">
                            <FormControl isRequired>
                                <FormControl.Label>Username</FormControl.Label>
                                <Input
                                    size="lg"
                                    type="text"
                                    onChangeText={(value) => {
                                        setData({ ...data, username: value });
                                    }}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input
                                    size="lg"
                                    type="password"
                                    onChangeText={(value) => {
                                        setData({ ...data, password: value });
                                    }}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>MFA Code</FormControl.Label>
                                <Input
                                    size="lg"
                                    type="password"
                                    onChangeText={(value) => {
                                        setData({ ...data, code: value });
                                    }}
                                />
                            </FormControl>
                            <Button
                                onPress={submit}
                                mt="2"
                                colorScheme="indigo"
                            >
                                Log in
                            </Button>
                            <HStack>
                                <Text>Don't have an account? </Text>
                                <Text
                                    onPress={() =>
                                        navigation.navigate('Signup')
                                    }
                                    underline
                                >
                                    Sign up
                                </Text>
                            </HStack>
                            {showAlert && (
                                <Alert w="100%" status="error">
                                    <VStack space={2} flexShrink={1} w="100%">
                                        <HStack
                                            flexShrink={1}
                                            space={2}
                                            justifyContent="space-between"
                                        >
                                            <HStack space={2} flexShrink={1}>
                                                <Alert.Icon mt="1" />
                                                <Text
                                                    fontSize="md"
                                                    color="coolGray.800"
                                                >
                                                    Invalid Login Credentials
                                                </Text>
                                            </HStack>
                                            <IconButton
                                                onPress={() => {
                                                    setShowAlert(false);
                                                }}
                                                variant="unstyled"
                                                _focus={{
                                                    borderWidth: 0
                                                }}
                                                icon={<CloseIcon size="3" />}
                                                _icon={{
                                                    color: 'coolGray.600'
                                                }}
                                            />
                                        </HStack>
                                    </VStack>
                                </Alert>
                            )}
                        </VStack>
                    </Box>
                </Center>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default memo(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center'
    }
});
