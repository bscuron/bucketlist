import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import {
    Spacer,
    Avatar,
    Heading,
    HStack,
    IconButton,
    Text,
    VStack,
    Container,
    Box
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Event, Profile } from '../types';
import { EditProfileMenu, EventView, NewEventMenu } from '../components';
import axios from 'axios';

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
    }, [events]);

    // TODO: replace with skeleton (https://docs.nativebase.io/skeleton) that actual layout
    if (!profile) return;

    // Profile field name list
    const ProfileField = () => {
        return (
            <VStack>
                <Text style={styles.profileField}>First Name:</Text>
                <Text style={styles.profileField}>Last Name:</Text>
                <Text style={styles.profileField}>Gender:</Text>
                <Text style={styles.profileField}>Birthday:</Text>
                <Text style={styles.profileField}>Member Since:</Text>
                <Text style={styles.profileField}>Introduction:</Text>
            </VStack>
        );
    };
    // User profile info
    const UserInfo = () => {
        return (
            <VStack>
                <Text style={styles.userInfo}>{profile.first_name}</Text>
                <Text style={styles.userInfo}>{profile.last_name}</Text>
                <Text style={styles.userInfo}>{profile.gender}</Text>
                <Text style={styles.userInfo}>{profile.dob}</Text>
                <Text style={styles.userInfo}>N/A </Text>
                <Box maxW="40">
                    <Text style={styles.userInfo}>{profile.introduction}</Text>
                </Box>
            </VStack>
        );
    };

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
                        <HStack space="2" margin="5" fontFamily="san Francisco">
                            <ProfileField />
                            <UserInfo />
                        </HStack>
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
                            <EventView w="auto" event={event} />
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
                        picture: undefined
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
    },

    profileField: {
        fontWeight: 'bold',
        fontSize: 14
    },

    userInfo: {
        fontSize: 14
    }
});
