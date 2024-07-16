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
import OnboardingScreen from '../screens/OnboardingScreen';
import GradeScreen from '../screens/GradeScreen';
import SchoolScreen from '../screens/SchoolScreen';
import FirstNameScreen from '../screens/FirstNameScreen';
import LastNameScreen from '../screens/LastNameScreen';
import GenderScreen from '../screens/GenderScreen';
import NoticeScreen from '../screens/NoticeScreen';
import DescriptionScreen from '../screens/DescriptionScreen';
import PasswordScreen from '../screens/PasswordScreen';
import {useAtom} from 'jotai';
import {modalAtom} from '../context';
import AgeScreen from '../screens/AgeScreen';

const FormStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [modal] = useAtom(modalAtom);
  return (
    <NavigationContainer>
      {modal.visible && <>{modal.component}</>}
      <FormStack.Navigator initialRouteName="Onboarding">
        <FormStack.Screen
          name="Inbox"
          component={InboxScreen}
          options={({navigation}) => ({
            headerRight: () =>
              HeaderVoteButton({navigation, color: theme.gray}),
            headerLeft: null as any,
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
          name="Skrr"
          component={VoteScreen}
          options={({navigation}) => ({
            headerLeft: () =>
              HeaderInboxButton({navigation, color: theme.whiteOpacity}),
            headerTitleStyle: {
              fontWeight: '800',
              fontSize: 17,
              color: theme.white,
            },
            headerBackgroundContainerStyle: {
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: theme.white,
            },
            headerTransparent: true,
          })}
        />
        <FormStack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{
            headerShown: false,
          }}
        />
        <FormStack.Screen
          name="Grade"
          component={GradeScreen}
          options={{
            headerShown: false,
          }}
        />
        <FormStack.Screen
          name="School"
          component={SchoolScreen}
          options={{
            headerShown: false,
          }}
        />
        <FormStack.Screen
          name="FirstName"
          component={FirstNameScreen}
          options={{
            headerShown: false,
          }}
        />
        <FormStack.Screen
          name="LastName"
          component={LastNameScreen}
          options={{
            headerShown: false,
          }}
        />
        <FormStack.Screen
          name="Gender"
          component={GenderScreen}
          options={{
            headerShown: false,
          }}
        />
        <FormStack.Screen
          name="Notice"
          component={NoticeScreen}
          options={{
            headerShown: false,
          }}
        />
        <FormStack.Screen
          name="Description"
          component={DescriptionScreen}
          options={{
            headerShown: false,
          }}
        />
        <FormStack.Screen
          name="Password"
          component={PasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <FormStack.Screen
          name="Age"
          component={AgeScreen}
          options={{
            headerShown: false,
          }}
        />
      </FormStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
