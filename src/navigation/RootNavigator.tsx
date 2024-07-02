import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InboxScreen from '../screens/InboxScreen';
import RootStackParamList from '../types/RootStackParamList';
import DetailScreen from '../screens/DetailScreen';
import VoteScreen from '../screens/VoteScreen';
import HeaderVoteButton from '../components/HeaderVoteButton';
import HeaderInboxButton from '../components/HeaderInboxButton';
import {theme} from '../styles/theme';

const FormStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <FormStack.Navigator>
        <FormStack.Screen
          name="Inbox"
          component={InboxScreen}
          options={({navigation}) => ({
            headerRight: () =>
              HeaderVoteButton({navigation, color: theme.gray}),
            headerTitleStyle: {fontWeight: '800', fontSize: 17},
          })}
        />
        <FormStack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <FormStack.Screen
          name="Vote"
          component={VoteScreen}
          options={({navigation}) => ({
            headerLeft: () =>
              HeaderInboxButton({navigation, color: theme.whiteOpacity}),
            headerTitleStyle: {
              fontWeight: '800',
              fontSize: 17,
              color: theme.white,
            },
            headerTransparent: true,
          })}
        />
      </FormStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
