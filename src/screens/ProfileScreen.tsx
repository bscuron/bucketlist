import React, { useContext, useEffect, useState } from 'react';
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
import moment from 'moment-timezone';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeFormatter = new TimeAgo('en-US');

const ProfileScreen = () => {
    const [profile, setProfile] = useState<Profile>();
    const [events, setEvents] = useState<Event[]>([]);
    const { token, logout, setEditProfile, setCreatingEvent } =
        useContext(Context);

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
                setProfile(res.data.profile);
                setEvents(res.data.events);
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
                            <HStack space={1}>
                                <Text bold>Introduction:</Text>
                                <Text>{profile.introduction}</Text>
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
                        {events.map((event) => (
                            <EventView
                                key={event.event_id}
                                w="auto"
                                event={event}
                            />
                        ))}
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
                        picture: undefined,
                        r_datetime: profile.r_datetime
                    }}
                    onUpdateProfile={setProfile}
                />
                <NewEventMenu />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center'
    }
});
