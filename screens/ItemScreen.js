import React, { useEffect, useState } from 'react';
import { Text,View,StyleSheet,StatusBar,TouchableOpacity,SafeAreaView,Component,FlatList,Button,ScrollView } from 'react-native';
import Constants from 'expo-constants'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Searchbar } from 'react-native-paper';

import { firebase } from '@firebase/app';
import '@firebase/firestore';
import firestore from '../firebase';
import ItemCard from './ItemCard'


export default function ItemScreen({navigation}) {
  const [items , setItems] = useState([]);




  async function GetItems(){
    let collRef = firestore.collection('items').orderBy('createdAt', 'desc');
    
    await collRef.get().then((querySnap) => {
      const tempDoc = querySnap.docs.map((doc) => {
        return {id: doc.id, ...doc.data()};
      });
      setItems(tempDoc);
    });
  }
  
  useEffect(() => {
GetItems();
   }, []);
  
  console.log(items);





  return ( 
    <SafeAreaView style={styles.container}>
<ScrollView style={styles.container} >
{items.map((item) => <ItemCard name={item.name} desc={item.desc} userid={item.userid} con={item.con} />)}
</ScrollView>
 </SafeAreaView>
  );
}








const styles = StyleSheet.create({
  container: {
    flex:1,
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
    color:'black',
  },
   retext: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
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