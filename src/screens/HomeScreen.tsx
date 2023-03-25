import React, { memo, useEffect, useState, useContext } from 'react';
import { Context } from '../../App';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { View, Icon, Tooltip, HStack, Input, IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NavigationMenu, EventView, NewEventMenu } from '../components';
import axios from 'axios';
import { Event } from '../types';
import fuzzysort from 'fuzzysort';

/**
 * Screen component for home screen (list view)
 */
const HomeScreen = () => {
    const navigation = useNavigation();
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [query, setQuery] = useState<string>('');
    const {
        token,
        logout,
        navigating,
        setNavigating,
        setCreatingEvent,
        rerender
    } = useContext(Context);

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
        const filteredEvents = fuzzysort
            .go(query, allEvents, {
                keys: Object.keys(allEvents[0])
            })
            .map((result) => result.obj);
        setFilteredEvents(filteredEvents);
    }, [allEvents, query]);

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

    // BUG: when navigating to another screen and back, the images do
    // not appear. This should be fixed when the content of the page is
    // loaded dynamically
    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <HStack style={styles.headerContainer} space={5}>
                    <Input
                        placeholder="Search for an event..."
                        alignSelf="center"
                        borderRadius="4"
                        minW="50%"
                        py="3"
                        px="1"
                        fontSize="14"
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
                <View style={styles.eventsContainer}>
                    {filteredEvents.map((row: Event) => (
                        <EventView
                            key={row.event_id}
                            event={row}
                            style={styles.event}
                        />
                    ))}
                </View>
                <NavigationMenu />
                <NewEventMenu />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default memo(HomeScreen);

const styles = StyleSheet.create({
    eventsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    event: {
        margin: 20
    },
    headerContainer: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
