import React, { memo, useEffect, useContext, useState } from 'react';
import { Context } from '../../App';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { VStack, Center, Avatar, Box, Heading, Stack, Text, Button, Tooltip, IconButton } from 'native-base';
import { Profile } from '../types';
import axios from 'axios';
import {MaterialIcons} from '@expo/vector-icons';

const ProfileScreen = () => {
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
    const { logout, token } = useContext(Context);

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
        <ScrollView style={{backgroundColor: '#F3D9D9'}}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <VStack space={2} alignItems="center" margin={10}>
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

                    <Stack direction={'column'} maxW={80}>
                        <Tooltip label="Edit Profile" openDelay={500}>
                            <IconButton
                                size='md'
                                variant='semi'
                                _icon={{
                                    as: MaterialIcons,
                                    name: 'edit'
                            }}
                            //onPress={}
                            />
                        </Tooltip>
                        <Box bg={'#E27E65'} borderRadius={20}>
                            <Text ml={2} mt={2} fontSize={20} color='white'>
                                First Name
                            </Text>
                            <Text margin={2} color='white'>
                                Welcome to the profile! See the introduction
                                here go and have a look Let see what we can find
                                in here. hello world ! check out my profile
                            </Text>
                        </Box>
                        <Text position={'relative'} ml={2} mt={10} bold>
                            Up Coming Events
                        </Text>
                        <Box bg={'white'} borderRadius={20}>
                            <Text margin={2} color='black'>
                                This is a Box for Upcoming Events
                            </Text>
                            <Button variant="link" size="sm" onPress={() => console.log("hello world")}
                                style={{ alignSelf: "flex-end" }}>View on map
                            </Button>
                        </Box>
                    </Stack>
                </VStack>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default memo(ProfileScreen);
