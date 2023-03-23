import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import { Actionsheet, Box, Heading } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { protectedScreens as screens } from '../Main';

const NavigationMenu = () => {
    const { logout, navigating, setNavigating } = useContext(Context);
    const navigation = useNavigation();
    const [disabledScreen, setDisabledScreen] = useState<string>(
        useRoute().name
    );

    return (
        <Actionsheet isOpen={navigating} onClose={() => setNavigating(false)}>
            <Actionsheet.Content>
                <Box
                    w="100%"
                    h={60}
                    px={4}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Heading size="md">Bucketlist</Heading>
                </Box>
                {Object.keys(screens).map((screen) => (
                    <Actionsheet.Item
                        key={screen}
                        onPress={() => {
                            navigation.navigate(screen);
                            setNavigating(false);
                        }}
                        isDisabled={screen === disabledScreen}
                    >
                        {screen}
                    </Actionsheet.Item>
                ))}
                <Actionsheet.Item
                    onPress={() => {
                        setNavigating(false);
                        logout();
                    }}
                >
                    Log out
                </Actionsheet.Item>
                <Actionsheet.Item onPress={() => setNavigating(false)}>
                    Cancel
                </Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default NavigationMenu;
