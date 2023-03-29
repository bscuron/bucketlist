import React, { memo, useEffect, useContext, useState } from 'react';
import { Context } from '../../App';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {
    VStack,
    Center,
    Avatar,
    Box,
    Heading,
    Stack,
    Text,
    Container,
    IconButton
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Profile } from '../types';
import { EditProfileMenu } from '../components';
import axios from 'axios';

const ProfileScreen = () => {
    const [Profile, setProfile] = useState<Profile>();
    const { token, logout, setEditProfile } = useContext(Context);
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

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <VStack space={2} maxW="80" alignSelf="center" margin={10}>
                    <Stack direction="row" space={40} margin={5}>
                        <Center>
                            <Avatar
                                source={require('../../assets/profile_image_placeholder.png')}
                                size="xl"
                            />
                        </Center>
                        <Center position={'absolute'} right={0} bottom={0}>
                            <Heading size={'md'}>Username</Heading>
                        </Center>
                    </Stack>
                    <Container alignItems="flex-end" maxW="80">
                        <IconButton
                            size="md"
                            variant="semi"
                            _icon={{
                                as: MaterialIcons,
                                name: 'edit'
                            }}
                            onPress={() => setEditProfile(true)}
                        />
                    </Container>
                    <Stack direction={'column'} maxW={80}>
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
                        <Text position={'relative'} ml={2} mt={10} color="grey">
                            Up Coming Events
                        </Text>
                    </Stack>
                </VStack>
                <EditProfileMenu />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default memo(ProfileScreen);
