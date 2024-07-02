import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InboxScreen from '../screens/InboxScreen';
import HeaderRightButton from '../components/HeaderRightButton';
import RootStackParamList from '../types/RootStackParamList';
import DetailScreen from '../screens/DetailScreen';

const FormStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <FormStack.Navigator>
        <FormStack.Screen
          name="Inbox"
          component={InboxScreen}
          options={{
            headerRight: HeaderRightButton,
          }}
        />
        <FormStack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </FormStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
