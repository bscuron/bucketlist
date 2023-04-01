import React, { memo, useEffect, useState, useContext } from 'react';
import { Context } from '../../App';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {
    View,
    Icon,
    Tooltip,
    HStack,
    Input,
    IconButton,
    VStack
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { EventView, NewEventMenu } from '../components';
import axios from 'axios';
import { Event } from '../types';
import fuzzysort from 'fuzzysort';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import moment from 'moment';

TimeAgo.addLocale(en);
const timeFormatter = new TimeAgo('en-US');

/**
 * Screen component for home screen (list view)
 */
const HomeScreen = () => {
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [query, setQuery] = useState<string>('');
    const { token, logout, setCreatingEvent, rerender } = useContext(Context);

    useEffect(() => {
        axios
            .get(
                'https://cis-linux2.temple.edu/bucketlistBackend/database/events',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((res) => {
                // Compute timestamps and set as datetime
                res.data.rows.forEach((event: Event) => {
                    event.created_datetime = timeFormatter.format(
                        moment
                            .utc(event.created_datetime, 'YYYY-MM-DDTHH:mm:ss')
                            .toDate(),
                        'twitter'
                    );
                });
                setAllEvents(res.data.rows);
            })
            .catch(logout);
    }, [rerender]);

    useEffect(() => {
        if (allEvents.length <= 0) return;
        if (query.length <= 0) {
            setFilteredEvents(allEvents);
            return;
        }
        const results = fuzzysort
            .go(query, allEvents, {
                keys: Object.keys(allEvents[0])
            })
            .map((result) => result.obj);

        setFilteredEvents(results);
    }, [allEvents, query]);

    // BUG: when navigating to another screen and back, the images do
    // not appear. This should be fixed when the content of the page is
    // loaded dynamically
    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View position="sticky" top={0} zIndex={999}>
                    <HStack
                        width="100%"
                        my={5}
                        alignItems="center"
                        justifyContent="center"
                        space={5}
                    >
                        <Input
                            placeholder="Search for an event..."
                            alignSelf="center"
                            borderRadius="4"
                            minW="50%"
                            py="3"
                            px="1"
                            fontSize="14"
                            bg="white"
                            _focus={{
                                backgroundColor: 'white'
                            }}
                            InputLeftElement={
                                <Icon
                                    m="2"
                                    ml="3"
                                    size="6"
                                    color="gray.400"
                                    as={<MaterialIcons name="search" />}
                                />
                            }
                            onChangeText={(value) => {
                                setQuery(value);
                            }}
                        />
                        <Tooltip label="Create new event" openDelay={500}>
                            <IconButton
                                size="md"
                                variant="solid"
                                _icon={{
                                    as: MaterialIcons,
                                    name: 'add'
                                }}
                                onPress={() => setCreatingEvent(true)}
                            />
                        </Tooltip>
                    </HStack>
                </View>
                <VStack space={2} alignItems="center">
                    {filteredEvents.map((row: Event) => (
                        <EventView
                            query={query}
                            w={['90%', '80%', '60%', '50%']}
                            key={row.event_id}
                            event={row}
                        />
                    ))}
                </VStack>
                <NewEventMenu />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default memo(HomeScreen);
