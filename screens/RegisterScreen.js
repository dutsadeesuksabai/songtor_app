import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet,TextInput,Button } from 'react-native';
import Constants from 'expo-constants';
import firestore from '../firebase';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Stack = createStackNavigator();



export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function UserReg(){
    await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password) 
    .then((user) => {
        
        let collRef = firestore.collection('users').doc(user.uid);

        collRef.set({
            name: name
        });
       
      })
      .catch(error => alert(error.message))
  }
  return (
    
    <View style={styles.container}>
<MaterialCommunityIcons activeOpacity={0.7} name="close-circle" color={"#576F72"} size={50} onPress={() => navigation.goBack()} />

<TextInput style={styles.input} placeholder='Name' onChangeText={setName} />
<TextInput style={styles.input} placeholder='E-mail' onChangeText={setEmail} />
<TextInput style={styles.input} placeholder='Password' onChangeText={setPassword} secureTextEntry />

<MaterialCommunityIcons activeOpacity={0.7} name="account-plus" color={"#576F72"} size={50} onPress={() => UserReg(navigation.navigate('Login'))} />


    </View>
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
    button: {
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