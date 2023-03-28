import React from 'react';
import { Avatar, Heading, Text, HStack, VStack } from 'native-base';
import { Event } from '../types';

interface EventProps {
    event: Event;
}

const EventView: React.FC<EventProps> = ({ event }) => {
    return (
        <HStack
            w={['90%', '80%', '60%', '50%']}
            bg="white"
            p={2}
            m={2}
            borderWidth={1}
            borderRadius={5}
            borderColor="gray.400"
            space={2}
        >
            <Avatar
                source={require('../../assets/profile_image_placeholder.png')}
                size="xl"
            />
            <VStack flex={1} space={5} my={2}>
                <HStack>
                    <VStack flex={1}>
                        <Heading size="sm" paddingLeft={0}>
                            {event.title}
                        </Heading>
                        <Text color="gray.500" italic>
                            Location: {event.location}
                        </Text>
                    </VStack>
                    <Text color="gray.500" paddingRight={0}>
                        30m ago
                    </Text>
                </HStack>
                <Text>{event.description}</Text>
            </VStack>
        </HStack>
    );
};

export default EventView;
