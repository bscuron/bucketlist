import React, { useState, useEffect } from 'react';
import EventEmitter from 'events';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Main from './src/Main';

/**
 * Context provided to children components. Since this is the top
 * level component, all child elements will have access to this context
 */
export const Context = React.createContext({
    token: '',
    setToken: async (token: string) => {},
    loadingContext: true,
    setLoadingContext: (value: boolean) => {},
    removeItem: (key: string) => {}
});

const emitter: EventEmitter = new EventEmitter();

/**
 * Application component
 */
const App = () => {
    const [token, setToken] = useState<string>('');
    const [loadingContext, setLoadingContext] = useState<boolean>(true);

    useEffect(() => {
        const storageListener = async () => {
            setLoadingContext(true);
            const token = (await AsyncStorage.getItem('token')) || '';
            setToken(token);
            setLoadingContext(false);
        };
        storageListener();

        // TODO: look into deprecation of removeEventListener. See message in browser console
        emitter.on('storage', storageListener);
        return () => {
            emitter.off('storage', storageListener);
        };
    }, []);

    const handleSetToken = async (token: string): Promise<void> => {
        setLoadingContext(true);
        await AsyncStorage.setItem('token', token);
        setToken(token);
        setLoadingContext(false);
    };

    const handleRemoveItem = async (key: string): Promise<void> => {
        setLoadingContext(true);
        await AsyncStorage.removeItem(key);
        setToken('');
        setLoadingContext(false);
    };

    return (
        <Context.Provider
            value={{
                token,
                setToken: handleSetToken,
                loadingContext,
                setLoadingContext,
                removeItem: handleRemoveItem
            }}
        >
            <Main />
        </Context.Provider>
    );
};

export default App;
