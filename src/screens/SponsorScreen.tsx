import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
    AlertDialog,
    Box,
    Button,
    Center,
    FormControl,
    HStack,
    Heading,
    Image,
    Input,
    Text,
    VStack
} from 'native-base';
import React, { memo, useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet
} from 'react-native';
import { FooterView } from '../components';
import { TOS } from '../util';

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
 */
const SponsorScreen = () => {
    const [data, setData] = useState<FormData>({});
    const [errors, setErrors] = useState<FormData>({});
    const [showTOS, setShowTOS] = useState<boolean>(false);
    const [showCode, setShowCode] = useState<boolean>(false);
    const [codeData, setCodeData] = useState<string>('');
    const [backupCode, setBackupCode] = useState<string>('');
    const navigation = useNavigation();

    /**
     * Handle user signup form submission
     */
    const submit = async () => {
        if (!validate()) return;
        setShowTOS(true);
    };

    /**
     * Create an account
     */
    const createAccount = async () => {
        setShowTOS(false);
        try {
            const result = await axios.post(
                'https://cis-linux2.temple.edu/bucketlistBackend/signup',
                {
                    username: data.username,
                    email: data.email,
                    password: data.password
                }
            );
            setCodeData(result.data.qrcode);
            setBackupCode(result.data.backupcode);
        } catch (error) {
            return;
        }
        setShowCode(true);
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
    const validateUsername = (username: string | undefined): boolean => {
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
                `https://cis-linux2.temple.edu/bucketlistBackend/database/users/username/${username}`
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
    const validateEmail = (email: string | undefined): boolean => {
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
                `https://cis-linux2.temple.edu/bucketlistBackend/database/users/email/${email}`
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
     * Validates password that user inputted is valid and that password equals confirmPassword
     * Password should contain at least:
     *  1. one digit
     *  2. one lower case
     *  3. one upper case
     *  4. eight from the mentioned characters
     *
     * @param {string} password - password to check
     * @param {string} confirmPassword - confirm password to check
     * @returns {boolean} Whether or not the password is email
     */
    const validatePasswords = (
        password: string | undefined,
        confirmPassword: string | undefined
    ): boolean => {
        let tmp: FormData = {};
        let valid: boolean = true;

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
                        <Heading size="xl">Sponsor us today!</Heading>
                        <Heading mt="1" size="sm" fontWeight="normal">
                            Fill in the form and we will reach back to you !
                            Thank you for your support!
                        </Heading>
                        <VStack space={3} mt="5">
                            <FormControl
                                isRequired
                                //isInvalid={'username' in errors}
                            >
                                <FormControl.Label>Name</FormControl.Label>
                                <Input
                                    size="lg"
                                    type="text"
                                    // onChangeText={(value) => {
                                    //     setData({ ...data, username: value });
                                    //     validateUsername(value);
                                    // }}
                                />
                                <FormControl.ErrorMessage>
                                    {errors.username}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <FormControl
                                isRequired
                                // isInvalid={'email' in errors}
                            >
                                <FormControl.Label>Email</FormControl.Label>
                                <Input
                                    size="lg"
                                    type="text"
                                    // onChangeText={(value) => {
                                    //     setData({ ...data, email: value });
                                    //     validateEmail(value);
                                    // }}
                                />
                                {/* <FormControl.ErrorMessage>
                                    {errors.email}
                                </FormControl.ErrorMessage> */}
                            </FormControl>

                            <Button
                                onPress={submit}
                                mt="2"
                                colorScheme="indigo"
                            >
                                Submit
                            </Button>
                        </VStack>
                    </Box>

                    <AlertDialog
                        leastDestructiveRef={useRef(null)}
                        isOpen={showTOS}
                        onClose={() => setShowTOS(false)}
                    >
                        <AlertDialog.Content>
                            <AlertDialog.CloseButton />
                            <AlertDialog.Header>
                                Terms of Service Agreement
                            </AlertDialog.Header>
                            <AlertDialog.Body>{TOS}</AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button.Group space={2}>
                                    <Button
                                        variant="unstyled"
                                        colorScheme="coolGray"
                                        onPress={() => setShowTOS(false)}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        colorScheme="success"
                                        onPress={() => createAccount()}
                                    >
                                        Agree
                                    </Button>
                                </Button.Group>
                            </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>

                    <AlertDialog
                        leastDestructiveRef={useRef(null)}
                        isOpen={showCode}
                        onClose={() => setShowCode(false)}
                    >
                        <AlertDialog.Content>
                            <AlertDialog.CloseButton />
                            <AlertDialog.Header>
                                Account Created!
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                Please scan the QR code with the Google
                                Authenticator app. Can't scan the QR Code? Use
                                the backup code as a setup key.
                                {'\n'}
                                Backup code: <Text bold>{backupCode}</Text>
                                <Center>
                                    <Image
                                        source={{
                                            uri: codeData
                                        }}
                                        size="xl"
                                    />
                                </Center>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button.Group space={2}>
                                    <Button
                                        variant="unstyled"
                                        colorScheme="coolGray"
                                        onPress={() => setShowCode(false)}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        colorScheme="success"
                                        onPress={() => {
                                            setShowCode(false);
                                            navigation.navigate('Login');
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Button.Group>
                            </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>
                </Center>
            </KeyboardAvoidingView>
            <FooterView />
        </ScrollView>
    );
};

export default memo(SponsorScreen);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center'
    }
});
