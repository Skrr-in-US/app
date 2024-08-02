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
import {useAtom, useAtomValue} from 'jotai';
import {colorAtom, isNeedInviteAtom, modalAtom, voteAtom} from '../context';
import AgeScreen from '../screens/AgeScreen';
import HeaderSupportButton from '../components/HeaderSupportButton';
import AboutScreen from '../screens/AboutScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ErrorScreen from '../screens/ErrorScreen';

const FormStack = createStackNavigator<RootStackParamList>();

const Tab = createMaterialTopTabNavigator();

const MyTabBar = ({state, descriptors, navigation}: any) => {
  const [backgroundColor] = useAtom(colorAtom);
  const isNeedInvite = useAtomValue(isNeedInviteAtom);
  const [vote] = useAtom(voteAtom);

  const isVoteScreen = state.index === 1;

  return (
    <View
      style={[
        tabBarStyles.view,
        {
          backgroundColor:
            isVoteScreen && !isNeedInvite
              ? backgroundColor[vote.step - 1]
              : theme.white,
        },
      ]}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tabBarStyles.item}>
            <Text
              style={[
                tabBarStyles.text,
                {
                  color: isFocused
                    ? isVoteScreen && !isNeedInvite
                      ? theme.white
                      : theme.black
                    : isVoteScreen && !isNeedInvite
                    ? theme.whiteOpacity
                    : theme.gray,
                },
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const tabBarStyles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'none',
  },
  view: {
    flexDirection: 'row',
    paddingTop: '6%',
    backgroundColor: theme.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.white,
  },
  item: {flex: 1, padding: 16},
});

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Skrr"
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarLabelStyle: {fontSize: 16, fontWeight: '700'},
        tabBarStyle: {backgroundColor: 'white', paddingTop: '4%'},
        tabBarIndicatorStyle: {backgroundColor: 'transparent'},
        tabBarActiveTintColor: theme.black,
        tabBarInactiveTintColor: theme.gray,
      }}>
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Skrr" component={VoteScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

const RootNavigator = () => {
  const [modal] = useAtom(modalAtom);
  const isNeedInvite = useAtomValue(isNeedInviteAtom);

  return (
    <NavigationContainer>
      {modal.visible && <>{modal.component}</>}
      <FormStack.Navigator initialRouteName="Onboarding">
        <FormStack.Screen
          name="Tab"
          component={TabNavigator}
          options={{headerShown: false}}
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
              HeaderInboxButton({
                navigation,
                color: isNeedInvite ? theme.gray : theme.whiteOpacity,
              }),
            headerRight: () =>
              HeaderSupportButton({
                navigation,
                color: isNeedInvite ? theme.gray : theme.whiteOpacity,
              }),
            headerTitleStyle: {
              fontWeight: '800',
              fontSize: 17,
              color: isNeedInvite ? theme.black : theme.white,
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
        <FormStack.Screen
          name="Error"
          component={ErrorScreen}
          options={{
            headerShown: false,
          }}
        />
        <FormStack.Screen
          name="About"
          component={AboutScreen}
          options={({navigation}) => ({
            headerLeft: () => HeaderVoteButton({navigation, color: theme.gray}),
            headerTitleStyle: {
              fontWeight: '800',
              fontSize: 17,
              color: theme.black,
            },
            headerBackgroundContainerStyle: {
              width: '100%',
              backgroundColor: theme.dark,
              borderBottomWidth: 1,
              borderBottomColor: theme.white,
            },
          })}
        />
      </FormStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
