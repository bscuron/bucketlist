import React from 'react';
import App from './src';
import { NativeBaseProvider } from 'native-base';
import { theme } from './src/core/theme';

const Main = () => (
    <NativeBaseProvider theme={theme}>
        <App />
    </NativeBaseProvider>
);

export default Main;
