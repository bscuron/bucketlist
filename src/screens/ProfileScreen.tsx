import React, { memo, useEffect, useContext, useState } from 'react';
import { Context } from '../../App';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {
    Icon,
    VStack,
    Center,
    Avatar,
    Box,
    Heading,
    Stack,
    Text
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationMenu } from '../components';
import { Profile } from '../types';
import axios from 'axios';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [Profile, setProfile] = useState<Profile>();
    //Default profile data to be filled when first loaded in. Will most likely be changed for a more seamless user experience.
    const defaultProfile: Profile = {
        username: 'Username',
        first_name: 'First Name',
        last_name: 'Last Name',
        gender: 'Gender',
        dob: 'Date of Birth: 00/00/0000',
        introduction: 'Introduce yourself here...',
        picture: 'Generic Picture'
    };
    const { navigating, setNavigating, logout, token } = useContext(Context);

    //Get call to retrieve user's profile data.
    useEffect(() => {
        axios
            .get('https://cis-linux2.temple.edu/bucketlistBackend/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                setProfile(res.data);
                console.log(res.data);
            })
            .catch(logout);
    }, []);

    //Data doesn't load instantly, will need to implement a loading screen until data is filled. Right now it autofills with default data
    //then updates after the res from the get, above, goes through.
    useEffect(() => {
        if (!Profile) {
            setProfile(defaultProfile);
        }
        console.log(Profile);
    }, [Profile]);

    useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        // Now the button includes an `onPress` handler to update the count
        navigation.setOptions({
            headerRight: () => (
                <Icon
                    as={Ionicons}
                    name="menu"
                    onPress={() => setNavigating(!navigating)}
                    color="black"
                    size="2xl"
                    mx="3%"
                />
            )
        });
    }, [navigation]);

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <VStack space={2} alignItems="center" margin={10}>
                    <Stack direction="row" space={40} margin={5}>
                        <Center>
                            <Avatar
                                source={require('../../assets/profile_image_placeholder.png')}
                                size="xl"
                                style={{ borderRadius: 50 }}
                            />
                        </Center>
                        <Center position={'absolute'} right={0} bottom={0}>
                            <Heading size={'md'}>Username</Heading>
                        </Center>
                    </Stack>

                    <Stack direction={'column'} maxW={80}>
                        <Box flex={'right'} mr={1}>
                            Edit
                        </Box>
                        <Box bg={'white'} borderRadius={20}>
                            <Text ml={2} mt={2} fontSize={20}>
                                First Name
                            </Text>
                            <Text margin={2}>
                                Welcome to the profile! See the introduction
                                here go and have a look Let see what we can find
                                in here. hello world ! check out my profile
                            </Text>
                        </Box>
                        <Text position={'relative'} ml={2} mt={10}>
                            Up Coming Events
                        </Text>
                    </Stack>
                </VStack>
                <NavigationMenu />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default memo(ProfileScreen);
