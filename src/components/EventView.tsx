import React, { useContext } from 'react';
import { Context } from '../../App';
import {
    Avatar,
    Heading,
    Text,
    HStack,
    VStack,
    Icon,
    Link,
    IconButton
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

interface EventProps {
    w: any | any[];
    event: Event;
    query?: string;
}

TimeAgo.addLocale(en);
const timeFormatter = new TimeAgo('en-US');

const EventView: React.FC<EventProps> = ({ w, event, query }) => {
    const { token } = useContext(Context);
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

    return (
        <HStack
            w={w}
            bg="white"
            p={2}
            m={2}
            borderRadius={5}
            shadow={2}
            space={2}
        >
            <Avatar
                source={require('../../assets/profile_image_placeholder.png')}
                size="xl"
            />
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
                                color="primary.600"
                            />
                            <Text color="primary.600">
                                {localEvent.host_datetime_formatted}
                            </Text>
                        </HStack>
                        <HStack>
                            <Icon
                                as={Entypo}
                                name="location-pin"
                                size="md"
                                color="primary.600"
                            />
                            <Link
                                href={createMapLink({ query: event.location })}
                                isUnderlined={false}
                                isExternal
                                _text={{
                                    color: 'primary.600'
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
                />
            )}
        </HStack>
    );
};

export default EventView;
