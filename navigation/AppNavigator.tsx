import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FarmerDashboard from '../screens/FarmerDashboard';
import IntermediateDashboard from '../screens/IntermediateDashboard';
import RiceProducerDashboard from '../screens/RiceProducerDashboard';
import ProfileScreen from '../screens/ProfileScreen';
import PostScreen from '../screens/PostScreen';

// Define the stack param list
export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Register: undefined;
  FarmerDashboard: undefined;
  IntermediateDashboard: undefined;
  RiceProducerDashboard: undefined;
  Profile: undefined;
  Post: { userType: string };
  Chat: { userType: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="FarmerDashboard" component={FarmerDashboard} />
        <Stack.Screen name="IntermediateDashboard" component={IntermediateDashboard} />
        <Stack.Screen name="RiceProducerDashboard" component={RiceProducerDashboard} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}