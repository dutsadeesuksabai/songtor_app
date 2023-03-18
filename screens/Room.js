import React, { useEffect, useState } from 'react';
import { Text,View,StyleSheet,StatusBar,TouchableOpacity,SafeAreaView,Component,FlatList,Button,ScrollView } from 'react-native';
import Constants from 'expo-constants'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import '@firebase/storage';
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import firestore from '../firebase';
import ItemCard from './ItemCard';
import ChatScreen from './Chat';

export default function RoomScreen({navigation}) {
  const [friends , setFriends] = useState([]);
 const [cuser , setCuser] = useState([]);


useEffect(() => {
  async function GetFriends() {
firebase.auth().onAuthStateChanged((user) => { 
    if (user) {
      setCuser(user);
    

  let collRef = firestore.collection('users').where(firebase.firestore.FieldPath.documentId() , '!=', cuser.uid);
    
    collRef.get().then((querySnap) => {
      const tempDoc = querySnap.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setFriends(tempDoc);
    });
    }
  });  
  }


  GetFriends();
}, [cuser]);

console.log(friends);

 return ( 
<View style={styles.container} >
<Text style={styles.head}>รายชื่อผู้ติดต่อทั้งหมด</Text>

{friends.map((item)=> (
  <TouchableOpacity  onPress = {() => 
    navigation.navigate('Chat',{
    friendID: item.id, 
    friendName: item.name,
    cuser: cuser
      })
    }
  > <Text style={styles.sub}>
  {item.name}</Text></TouchableOpacity>
   ))}
</View>
  );
  }



 







const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  head: {
    marginTop: 0,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#576F72',
  },
    sub: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#576F72',
    paddingTop: 20,
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