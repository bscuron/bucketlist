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
    name?: string;
    email?: string;
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
     * Handle user sponsor form submission
     */
    const submit = async () => {
        
        await insertSponsor();
        setShowTOS(true);
    };

    /**
     * Sponsor request
     */
    const insertSponsor = async () => {
      
        setShowTOS(false);
        try {
            const result = await axios.post(
                'https://cis-linux2.temple.edu/bucketlistBackend/sponsor/create',
                {
                    name: data.name,
                    email: data.email
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
            validateEmail(data.email)
        );
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
                                    onChangeText={(value) => {
                                        setData({ ...data, name: value });
                                 }}
                                />
                                <FormControl.ErrorMessage>
                                    {errors.name}
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
                                    onChangeText={(value) => {
                                         setData({ ...data, email: value });
                                     }}
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
