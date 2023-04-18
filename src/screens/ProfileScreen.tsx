import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Event, Profile } from '../types';
import { EditProfileMenu, EventView, NewEventMenu } from '../components';
import axios from 'axios';
import moment from 'moment-timezone';

const ProfileScreen = ({ route }: any) => {
    const [profile, setProfile] = useState<Profile>();
    const [events, setEvents] = useState<Event[]>([]);
    const [allProfiles, setallProfiles] = useState<Profile[]>([]);
    const [usernames, setUsernames] = useState<String[]>([]);
    const { token, logout, setEditProfile, setCreatingEvent } =
        useContext(Context);
    const navigation = useNavigation();
    const { username } = route.params || {};

    const fetchData = () => {
        axios
            .get(
                `https://cis-linux2.temple.edu/bucketlistBackend/profile/${
                    username || ''
                }`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((res) => {
                setProfile(res.data.profile);
                setEvents(res.data.events);
            })
            .catch(logout);
    };

    // GET request to retrieve user's profile data
    useEffect(() => {
        fetchData();
    }, [username]);

    //GET request to retrieve all user profile data
    useEffect(() => {
        axios
            .get('https://cis-linux2.temple.edu/bucketlistBackend/profiles', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                setallProfiles(res.data.rows);
            })
            .catch(logout);
    }, []);

    useEffect(() => {
        if (allProfiles) {
            setUsernames(allProfiles.map((profile) => profile.username));
        }
    }, [allProfiles]);

    // TODO: replace with skeleton (https://docs.nativebase.io/skeleton) that actual layout
    if (!profile || !allProfiles) return;

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
                <SelectDropdown
                    data={usernames}
                    onSelect={(username, _) => {
                        navigation.navigate('Profile', {
                            username: username
                        });
                    }}
                    defaultButtonText={'Search for other users...'}
                    buttonTextAfterSelection={(selectedItem, _) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, _) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={(isOpened) => {
                        return (
                            <FontAwesome
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={'#444'}
                                size={18}
                            />
                        );
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                    selectedRowStyle={styles.dropdown1SelectedRowStyle}
                    search
                    searchInputStyle={styles.dropdown1searchInputStyleStyle}
                    searchPlaceHolder={'Search here'}
                    renderSearchInputLeftIcon={() => {
                        return (
                            <FontAwesome
                                name={'search'}
                                color={'#444'}
                                size={18}
                            />
                        );
                    }}
                />
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
                                <Text>
                                    {moment
                                        .utc(profile.dob, 'YYYY-MM-DD')
                                        .format('MMMM D, YYYY')}{' '}
                                    (
                                    {moment().diff(
                                        moment
                                            .utc(profile.dob)
                                            .tz(moment.tz.guess()),
                                        'years'
                                    )}
                                    )
                                </Text>
                            </HStack>
                            <HStack space={1}>
                                <Text bold>Member since:</Text>
                                <Text>
                                    {moment
                                        .utc(
                                            profile.r_datetime,
                                            'YYYY-MM-DDTHH:mm:ss'
                                        )
                                        .tz(moment.tz.guess())
                                        .format('MMMM D, YYYY')}
                                </Text>
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
                                update={fetchData}
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
                <NewEventMenu update={fetchData} />
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
    dropdown1BtnStyle: {
        width: '80%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444'
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5'
    },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1SelectedRowStyle: { backgroundColor: 'rgba(0,0,0,0.1)' },
    dropdown1searchInputStyleStyle: {
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#444'
    }
});
