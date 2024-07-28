import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import RootStackParamList from '../types/RootStackParamList';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../styles/theme';
import {useSetAtom} from 'jotai';
import {signupAtom} from '../context';
import {useQuery} from '@tanstack/react-query';
import {query} from '../services/query';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Grade'>;
};

const SchoolScreen: React.FC<Props> = ({navigation}) => {
  const setSignup = useSetAtom(signupAtom);
  const [search, setSearch] = useState('');
  const {data, refetch} = useQuery(query.school(search));
  console.log(data);

  const handleSetSchool = (school: string) => {
    setSignup(prev => ({...prev, school}));
    navigation.navigate('FirstName');
  };

  const handleChangeSearch = (keyword: string) => {
    setSearch(keyword);
    setTimeout(() => {
      refetch();
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 17, height: 17}}
            source={require('../assets/images/arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Pick your school</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.selectButtonTop}>
          <TextInput
            onChangeText={handleChangeSearch}
            value={search}
            style={styles.selectButtonInput}
            placeholder="Search your school"
          />
        </View>
        <View style={styles.selectOption}>
          <Text style={styles.selectOptionText}>HIGH SCHOOL</Text>
        </View>
        <ScrollView>
          {data?.map((school: any) => (
            <TouchableOpacity
              onPress={() => handleSetSchool(school.school)}
              key={school.id}
              style={styles.selectButton}>
              <Image
                source={{uri: school.logo}}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{width: 38, height: 38}}
              />
              <View style={styles.schoolInfo}>
                <Text style={styles.schoolInfoName}>{school.school}</Text>
                <Text style={styles.schoolInfoDescription}>
                  {school.county}, {school.state}
                </Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberCount}>{school.people}</Text>
                <Text style={styles.memberText}>MEMBERS</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.primary,
  },
  header: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.white,
  },
  back: {
    position: 'absolute',
    left: '6%',
    bottom: 22,
  },
  body: {
    flex: 8,
    width: '100%',
    height: '100%',
    backgroundColor: theme.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  selectButtonTop: {
    width: '100%',
    height: 63,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  selectButtonInput: {
    fontSize: 16,
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  selectButton: {
    width: '100%',
    height: 63,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  schoolInfo: {
    gap: 4,
  },
  schoolInfoName: {
    fontSize: 14,
    fontWeight: '600',
  },
  schoolInfoDescription: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.description,
  },
  memberInfo: {
    gap: 4,
    alignItems: 'center',
    marginLeft: 'auto',
  },
  memberCount: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.primary,
  },
  memberText: {
    fontSize: 11,
    fontWeight: '500',
    color: theme.description,
  },
  selectOption: {
    width: '100%',
    height: 34,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    backgroundColor: theme.select,
    justifyContent: 'center',
  },
  selectOptionText: {
    fontWeight: '500',
    fontSize: 14,
    color: theme.selectText,
  },
});

export default SchoolScreen;
