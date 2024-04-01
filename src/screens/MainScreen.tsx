import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import Cooking from './Cooking';
import {HomeStackParamsList} from './HomeScreen';
import Restaurants from './Restaurants';

type RootTabParamsList = {
  Restaurants: undefined;
  Cooking: undefined;
};

type mainStackScreenProps = NativeStackScreenProps<HomeStackParamsList, 'Main'>;

const MainScreen: React.FC<mainStackScreenProps> = ({navigation, route}) => {
  const Tab = createBottomTabNavigator<RootTabParamsList>();

  return (
    <Tab.Navigator
      initialRouteName="Restaurants"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          top: 200,
          backgroundColor: 'transparent',
          elevation: 0,
          borderTopWidth: 0,
          paddingHorizontal: 15,
        },
        tabBarIconStyle: {display: 'none'},
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 20,
                color: focused ? '#000000' : 'gray',
                width: '100%',
                textAlign: 'center',
                borderBottomColor: focused ? '#112939' : '#D9D9D9',
                borderBottomWidth: 4,
                paddingVertical: 5,
                borderRadius: 4,
                // borderBottomEndRadius: 10,
                fontFamily: 'Inter',
                fontWeight: '600',
              }}>
              Restaurants
            </Text>
          ),
        }}
        name="Restaurants"
        children={() => <Restaurants navigation={navigation} route={route} />}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 20,
                color: focused ? '#000000' : 'gray',
                width: '100%',
                textAlign: 'center',
                borderBottomColor: focused ? '#112939' : '#D9D9D9',
                borderBottomWidth: 4,
                paddingVertical: 5,
                borderRadius: focused ? 4 : 0,
                fontWeight: '600',
              }}>
              Cooking
            </Text>
          ),
        }}
        name="Cooking"
        component={Cooking}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
