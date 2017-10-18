import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { NavigationActions, StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const styles = {
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    first: {
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    second: {
        backgroundColor: 'green',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabsButton: {
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    tabsButtonText: {
        color: 'blue'
    }
}

const Home = () => (
    <View style={styles.home}>
        <Text>Home Screen</Text>
    </View>
);

const Button = ({ navigation, label, route, onButtonPress }) => {
    const onPress = typeof onButtonPress === 'function'
        ? onButtonPress
        : () => navigation.navigate(route);

    return (
        <TouchableHighlight onPress={onPress} style={styles.tabsButton}>
            <View>
                <Text style={styles.tabsButtonText}>{label}</Text>
            </View>
        </TouchableHighlight>
    );
}

const HomeNavigator = StackNavigator(
    {
        home: {
            screen: Home,
            navigationOptions: {
                title: 'Home'
            }
        }
    }, {
        headerMode: 'none'
    }
);

const First = () => (
    <View style={styles.first}>
        <Text style={{ color: 'white' }}>First Tab Screen</Text>
    </View>
);

const Second = () => (
    <View style={styles.second}>
        <Text style={{ color: 'white' }}>Second Tab Screen</Text>
    </View>
);

const TabsNavigator = TabNavigator(
    {
        firstTab: {
            screen: First,
            navigationOptions: {
                title: 'First Tab'
            }
        },
        secondTab: {
            screen: Second,
            navigationOptions: {
                title: 'Second Tab'
            }
        }
    }, {
        animationEnabled: true,
        initialRouteName: 'secondTab',
        swipeEnabled: false,
        tabBarPosition: 'bottom',
        tabBarComponent: TabBarBottom,
        tabBarOptions: {
            activeTintColor: '#05b0ba',
            inactiveTintColor: '#a7a9ac',
            activeBackgroundColor: '#fff',
            inactiveBackgroundColor: '#fff',
            tabStyle: {
                backgroundColor: '#fff'
            }
        }
    }
);

const MainNavigator = StackNavigator(
    {
        index: {
            screen: HomeNavigator,
            navigationOptions: props => ({
                headerRight: <Button {...props} label={'Tabs'} route={'tabs'} />
            })
        },
        tabs: {
            screen: TabsNavigator
        }
    }, {
        initialRouteName: 'index'
    }
);

const rootReducer = combineReducers({
    navigation: (state, action) => {
        const newState = MainNavigator.router.getStateForAction(action, state);

        return newState || state;
    }
});

const store = createStore(rootReducer);

const App = () => (
    <Provider store={store}>
        <MainNavigator />
    </Provider>
);

export default App;
