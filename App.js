import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import ProfileUser from './ProfileUser';
import Search from './Search';
import Chat from './Chats';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import ProfessionalsList from './ProfessionalsList';
import ProfessionalProfile from './ProfessionalProfile';
import Messages from './Messages';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ProfileUser" component={ProfileUser} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ProfessionalsList" component={ProfessionalsList} />
        <Stack.Screen name="ProfessionalProfile" component={ProfessionalProfile} />
        <Stack.Screen name="Messages" component={Messages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}