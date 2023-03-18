import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet,TextInput,Button,TouchableOpacity,Image } from 'react-native';
import Constants from 'expo-constants';
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import firestore from '../firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Stack = createStackNavigator();
import '@firebase/auth';


export default function LoginScreen({ navigation })  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function UserLogin(){
    await firebase.auth().signInWithEmailAndPassword(email, password).then((user)=>{ 
      firebase.auth().onAuthStateChanged((user) => {if (user){ navigation.navigate('Home')}})

    }).catch((error) => {alert(error.message)})

  }
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')}  style={{ margin:"10%", alignSelf: "center",resizeMode: "contains"}} />
<TextInput style={styles.input} placeholder='E-mail' onChangeText={setEmail} />
<TextInput style={styles.input} placeholder='Password' onChangeText={setPassword} secureTextEntry />


<MaterialCommunityIcons activeOpacity={0.7} name="login" color={"#576F72"} size={50} onPress={() => UserLogin()} />

<TouchableOpacity>
<Text style={styles.retext} onPress={() => navigation.navigate('Reg')} > หากยังไม่มีบัญชี <Text style={{color:"#576F72"}}>สมัครสิ </Text></Text>
</TouchableOpacity>
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
    buttons: {
    backgroundColor: '#e91e63',
    hover: "#ad1457",
     width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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
