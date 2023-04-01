import React from 'react';
import { Avatar, Heading, Text, HStack, VStack, Icon, Link } from 'native-base';
import { Event } from '../types';
import { Entypo } from '@expo/vector-icons';
import { createMapLink } from 'react-native-open-maps';
import fuzzysort from 'fuzzysort';
import structuredClone from '@ungap/structured-clone';

interface EventProps {
    w: any | any[];
    event: Event;
    query?: string;
}

const EventView: React.FC<EventProps> = ({ w, event, query }) => {
    let highlightedEvent: Event = event;

    // Only make structured copy if highlights are needed
    if (query) {
        highlightedEvent = structuredClone(event);
        for (let [key, value] of Object.entries(event)) {
            const result = fuzzysort.single(query, value);
            if (!result) {
                highlightedEvent[key] = value;
                continue;
            }
            highlightedEvent[key] =
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
                            {highlightedEvent.title}
                        </Heading>
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
                                {highlightedEvent.location}
                            </Link>
                        </HStack>
                    </VStack>
                    <Text color="gray.500" paddingRight={0}>
                        {highlightedEvent.created_datetime}
                    </Text>
                </HStack>
                <Text>{highlightedEvent.description}</Text>
            </VStack>
        </HStack>
    );
};

export default EventView;
