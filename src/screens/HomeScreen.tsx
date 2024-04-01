import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import ViewAllScreen from './ViewAllScreen';
import {mealDataType} from '../constants';

export type HomeStackParamsList = {
  Main: undefined;
  ViewAll: {filterData: mealDataType[]};
};

const HomeScreen = () => {
  const Stack = createNativeStackNavigator<HomeStackParamsList>();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="ViewAll" component={ViewAllScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
