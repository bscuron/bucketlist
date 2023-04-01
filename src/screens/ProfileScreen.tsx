import React, { memo, useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet
} from 'react-native';
import {
    Spacer,
    Avatar,
    Heading,
    HStack,
    IconButton,
    Text,
    VStack
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Event, Profile } from '../types';
import { EditProfileMenu, EventView, NewEventMenu } from '../components';
import axios from 'axios';

const placeholder_event: Event = {
    event_id: '123',
    creator_id: '123',
    location: 'Temple University',
    title: 'Placeholder',
    description: 'Description goes here',
    created_datetime: new Date().toISOString()
};

const ProfileScreen = () => {
    const [profile, setProfile] = useState<Profile>();
    const { token, logout, setEditProfile, setCreatingEvent } =
        useContext(Context);
    const updateProfile = (updatedProfile: Profile) => {
        setProfile(updatedProfile);
    };

    // GET request to retrieve user's profile data
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

    // TODO: replace with skeleton (https://docs.nativebase.io/skeleton) that actual layout
    if (!profile) return;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden'
                }}
            >
                <VStack
                    w={['90%', '90%', '45%']}
                    alignItems="center"
                    justifyContent="center"
                >
                    <VStack
                        minW="60%"
                        alignItems="center"
                        space={2}
                        bg="white"
                        my={5}
                        py={5}
                        borderRadius={5}
                        shadow={2}
                    >
                        <Heading>{profile.username}</Heading>
                        <Avatar
                            source={require('../../assets/profile_image_placeholder.png')}
                            size="2xl"
                            borderColor="gray.200"
                            borderWidth={1}
                        >
                            <Avatar.Badge bg="blue.500">
                                <IconButton
                                    size="xs"
                                    _icon={{
                                        as: MaterialIcons,
                                        name: 'edit',
                                        color: 'white'
                                    }}
                                    onPress={() => setEditProfile(true)}
                                />
                            </Avatar.Badge>
                        </Avatar>
                        <VStack alignItems="start">
                            <HStack space={1}>
                                <Text bold>First name:</Text>
                                <Text>{profile.first_name}</Text>
                            </HStack>
                            <HStack space={1}>
                                <Text bold>Last name:</Text>
                                <Text>{profile.last_name}</Text>
                            </HStack>
                            <HStack space={1}>
                                <Text bold>Gender:</Text>
                                <Text>{profile.gender}</Text>
                            </HStack>
                            <HStack space={1}>
                                <Text bold>Birthday:</Text>
                                <Text>{profile.dob}</Text>
                            </HStack>
                            <HStack space={1}>
                                <Text bold>Member since:</Text>
                                <Text>{profile.r_datetime}</Text>
                            </HStack>
                        </VStack>
                    </VStack>
                </VStack>
                <VStack
                    w={['90%', '80%', '60%', '50%']}
                    justifyContent="center"
                >
                    <HStack>
                        <Heading size="lg" ml="2">
                            Upcoming Events
                        </Heading>
                        <Spacer />
                        <IconButton
                            mr={2}
                            size="md"
                            variant="solid"
                            _icon={{
                                as: MaterialIcons,
                                name: 'add',
                                color: 'white'
                            }}
                            onPress={() => setCreatingEvent(true)}
                        />
                    </HStack>

                    <VStack overflow="scroll" minH="50vh" maxH="60vh" w="100%">
                        <EventView w="auto" event={placeholder_event} />
                        <EventView w="auto" event={placeholder_event} />
                        <EventView w="auto" event={placeholder_event} />
                        <EventView w="auto" event={placeholder_event} />
                        <EventView w="auto" event={placeholder_event} />
                        <EventView w="auto" event={placeholder_event} />
                    </VStack>
                </VStack>
                <EditProfileMenu
                    profile={{
                        username: profile.username,
                        first_name: profile.first_name,
                        last_name: profile.last_name,
                        gender: profile.gender,
                        dob: profile.dob,
                        introduction: profile.introduction,
                        picture: undefined
                    }}
                    onUpdateProfile={updateProfile}
                />
                <NewEventMenu />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
export default memo(ProfileScreen);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center'
    }
});
