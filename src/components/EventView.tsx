import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../../App';
import {
    Avatar,
    Heading,
    Text,
    HStack,
    VStack,
    Icon,
    Link,
    IconButton,
    Pressable
} from 'native-base';
import { Event } from '../types';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { createMapLink } from 'react-native-open-maps';
import fuzzysort from 'fuzzysort';
import structuredClone from '@ungap/structured-clone';
import moment from 'moment-timezone';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

interface EventProps {
    w: any | any[];
    event: Event;
    query?: string;
}

TimeAgo.addLocale(en);
const timeFormatter = new TimeAgo('en-US');

const EventView: React.FC<EventProps> = ({ w, event, query }) => {
    const navigation = useNavigation();
    const { token, logout } = useContext(Context);
    const decodedToken: any = jwtDecode(token);
    let localEvent: Event = event;

    // Format the host datetime to match format "April 1, 2023 @ 1:00pm""
    localEvent.host_datetime_formatted = moment
        .utc(event.host_datetime, 'YYYY-MM-DDTHH:mm:ss')
        .tz(moment.tz.guess())
        .format('MMMM D, YYYY @ hA');

    // Compute timestamps
    localEvent.timestamp = timeFormatter.format(
        moment.utc(event.created_datetime, 'YYYY-MM-DDTHH:mm:ss').toDate(),
        'twitter'
    );

    // Only make structured copy if highlights are needed
    if (query) {
        localEvent = structuredClone(event);
        for (let [key, value] of Object.entries(event)) {
            const result = fuzzysort.single(query, value);
            if (!result) {
                localEvent[key] = value;
                continue;
            }
            localEvent[key] =
                fuzzysort.highlight(result, (match: string, index: number) => (
                    <Text key={index} highlight>
                        {match}
                    </Text>
                )) || value;
        }
    }

    const deleteEvent = async () => {
        try {
            await axios.delete(
                `https://cis-linux2.temple.edu/bucketlistBackend/delete/event/${event.event_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
        } catch (err) {
            logout();
        }
    };

    const attendEvent = async () => {
        try {
            await axios.post(
                `https://cis-linux2.temple.edu/bucketlistBackend/attend/event/${event.event_id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
        } catch (err) {
            logout();
        }
    };

    const abandonEvent = async () => {
        try {
            await axios.post(
                `https://cis-linux2.temple.edu/bucketlistBackend/abandon/event/${event.event_id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
        } catch (err) {
            logout();
        }
    };

    return (
        <Pressable w={w}>
            {({ isHovered, isFocused, isPressed }) => {
                return (
                    <HStack
                        bg="white"
                        style={{
                            transform: [
                                {
                                    scale: isPressed ? 0.96 : 1
                                }
                            ]
                        }}
                        p={2}
                        m={2}
                        borderRadius={5}
                        shadow={2}
                        space={2}
                    >
                        <VStack alignItems="center">
                            <Avatar
                                source={require('../../assets/profile_image_placeholder.png')}
                                size="xl"
                            />
                            <Link
                                onPress={() =>
                                    navigation.navigate('Profile', {
                                        username: event.organizer
                                    })
                                }
                                isUnderlined={false}
                                isExternal
                                my={1}
                                px={1}
                                _text={{
                                    color: 'gray.500'
                                }}
                                _hover={{
                                    bg: 'gray.100',
                                    borderRadius: 5
                                }}
                            >
                                @{localEvent.organizer}
                            </Link>
                        </VStack>
                        <VStack flex={1} space={5} m={2}>
                            <HStack>
                                <VStack flex={1}>
                                    <Heading size="sm" paddingLeft={0}>
                                        {localEvent.title}
                                    </Heading>
                                    <HStack space={1}>
                                        <Icon
                                            as={AntDesign}
                                            name="calendar"
                                            size="md"
                                            color="blue.400"
                                        />
                                        <Text color="blue.400">
                                            {localEvent.host_datetime_formatted}
                                        </Text>
                                    </HStack>
                                    <HStack>
                                        <Icon
                                            as={Entypo}
                                            name="location-pin"
                                            size="md"
                                            color="blue.400"
                                        />
                                        <Link
                                            px={1}
                                            href={createMapLink({
                                                query: event.location
                                            })}
                                            isUnderlined={false}
                                            isExternal
                                            _text={{
                                                color: 'blue.400'
                                            }}
                                            _hover={{
                                                bg: 'blue.50',
                                                borderRadius: 5
                                            }}
                                        >
                                            {localEvent.location}
                                        </Link>
                                    </HStack>
                                </VStack>
                                <Text color="gray.500" paddingRight={0}>
                                    {localEvent.timestamp}
                                </Text>
                            </HStack>
                            <Text>{localEvent.description}</Text>
                            {localEvent.attendees && (
                                <Text color="gray.500">
                                    {localEvent.attendees}
                                </Text>
                            )}
                        </VStack>
                        {event.user_id == decodedToken.user_id && (
                            <IconButton
                                size="md"
                                colorScheme="danger"
                                _icon={{
                                    as: AntDesign,
                                    name: 'delete',
                                    color: 'gray.400'
                                }}
                                _hover={{
                                    _icon: {
                                        color: 'red.300'
                                    }
                                }}
                                onPress={() => deleteEvent()}
                            />
                        )}
                        {!event.attending && (
                            <IconButton
                                size="md"
                                colorScheme="success"
                                _icon={{
                                    as: AntDesign,
                                    name: 'addusergroup',
                                    color: 'gray.400'
                                }}
                                _hover={{
                                    _icon: {
                                        color: 'tertiary.500'
                                    }
                                }}
                                onPress={() => attendEvent()}
                            />
                        )}
                        {event.user_id != decodedToken.user_id &&
                            !!event.attending && (
                                <IconButton
                                    size="md"
                                    colorScheme="danger"
                                    _icon={{
                                        as: AntDesign,
                                        name: 'deleteusergroup',
                                        color: 'gray.400'
                                    }}
                                    _hover={{
                                        _icon: {
                                            color: 'red.300'
                                        }
                                    }}
                                    onPress={() => abandonEvent()}
                                />
                            )}
                    </HStack>
                );
            }}
        </Pressable>
    );
};

export default EventView;
