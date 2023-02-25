import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SignupScreen, DBScreen } from './screens';

const Router = createStackNavigator(
    {
        SignupScreen,
        DBScreen // TODO: remove this screen (just shows database contents)
    },
    {
        initialRouteName: 'SignupScreen',
        headerMode: 'none'
    }
);

export default createAppContainer(Router);
