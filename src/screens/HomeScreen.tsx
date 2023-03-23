import React, { memo, useEffect, useContext } from 'react';
import { Context } from '../../App';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { Text, Icon, View, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationMenu, Event } from '../components';

/**
 * Screen component for home screen (list view)
 */
const HomeScreen = () => {
    const navigation = useNavigation();
    const { navigating, setNavigating } = useContext(Context);

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
                style={styles.container}
            >
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <NavigationMenu />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default memo(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginLeft: '2%',
        marginRight: '2%'
    },
    event: {
        margin: 20
    }
});
