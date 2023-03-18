import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import PlusScreen from './screens/PlusScreen'
import ChatScreen from './screens/Chat'
import RoomScreen from './screens/Room'

const Stack = createStackNavigator();

export default function Nested() {
  return (
<NavigationContainer>
<Stack.Navigator initialRouteName="Login">
<Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
<Stack.Screen options={{ headerShown: false }} name="Reg" component={RegisterScreen} />
<Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
<Stack.Screen options={{ headerShown: false }} name="Plus" component={PlusScreen} />
<Stack.Screen name="Chat" component={ChatScreen} />
<Stack.Screen options={{ headerShown: false }}  name="Room" component={RoomScreen}  />
</Stack.Navigator>
</NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4DCCF',
    padding: 8,
  },
    buttons: {
    backgroundColor: '#e91e63',
    hover: "#ad1457",
     width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
   retext: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop:'5%',
    textDecorationColor:'#576F72',
  },
input: {
    backgroundColor: '#F0EBE3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '80%'
  }
});