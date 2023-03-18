import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image ,TouchableOpacity } from 'react-native';
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import firestore from '../firebase';
import '@firebase/auth';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function ItemCard(props) {
  const [cuser,setCuser] = useState([]);




  async function Wish(id,name,desc,con){
    let docRef = firestore.collection('users').doc(cuser.uid).collection('Wish');

    docRef.add({
      name: name,
      desc: desc,
      itemid: id,
      con: con,
    });

  }

useEffect(() => {
 async function CheckLogin(){
   firebase.auth().onAuthStateChanged((user) => {
     if (user) {
        setCuser(user);
     }
   });
  
  }
CheckLogin();
   }, []);

async function Remove(id){
  let collRef = firestore.collection('items').doc(id);

  await collRef.delete();
}


  
  return (
  

    <View style={styles.container} >
      <Text style={styles.head}>{props.name}</Text>
      <Text style={styles.sub}>{props.desc}</Text>
      <Text style={styles.sub}> ติดต่อได้ที่ {props.con}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#7D9D9C",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderColor: "#576F72",
    borderRadius: 10,borderWidth: 2,
    alignContent:'',
    marginTop:'5%',
    flex:'1',
  },
  head: {
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F0EBE3',
  },
    sub: {
    fontSize: 14,
    textAlign: 'center',
    color: '#F0EBE3',
  },
  logo: {
    height: 128,
    width: 128,
  }
});
