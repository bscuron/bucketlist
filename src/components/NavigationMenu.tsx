import React, { useContext } from 'react';
import { Context } from '../../App';
import { Actionsheet, Box, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { protectedScreens as screens } from '../Main';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    disabledScreen?: string;
}

const NavigationMenu: React.FC<Props> = ({
    isOpen,
    onClose,
    disabledScreen
}) => {
    const { logout } = useContext(Context);
    const navigation = useNavigation();
    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
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
                        onPress={() => navigation.navigate(screen)}
                        isDisabled={disabledScreen === screen}
                    >
                        {screen}
                    </Actionsheet.Item>
                ))}
                <Actionsheet.Item onPress={() => logout()}>
                    Log out
                </Actionsheet.Item>
                <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default NavigationMenu;
