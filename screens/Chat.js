import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Text,View,StyleSheet,StatusBar,TouchableOpacity,SafeAreaView,Component,FlatList,Button,ScrollView,TextInput } from 'react-native';
import Constants from 'expo-constants';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import RoomScreen from './Room'
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import firestore from '../firebase';
import '@firebase/storage';


export default function ChatScreen({ route ,navigation }) {
 const [messages , setMessages] = useState([]);


const { friendID } = route.params;
const { friendName } = route.params;
const { cuser } = route.params;

useEffect(() => {
  let unsub;


async function GetMessages() {
  let collRef = firestore
  .collection('users')
  .doc(cuser.uid)
  .collection('chats')
  .doc(friendID)
  .collection('messages')
  .orderBy('createdAt', 'desc');
    
      unsub = await collRef.onSnapshot((qSnap) => {
        const tempdoc = qSnap.docs.map((doc) => {
            let user = doc.data().user;
            user['name'] = friendName;
            return {
              _id: doc.id,
              text: doc.data().text,
              createdAt: doc.data().createdAt.toDate(),
              user: user,
            };
        });
        setMessages(tempdoc);
      });
    } 

  GetMessages();
   return async () => {
    await unsub;
  };
});


async function SaveMassage(newMessage) {
 const senderRef = firestore
 .collection('users')
 .doc(cuser.uid)
 .collection('chats')
 .doc(friendID)
 .collection('messages');
 await senderRef.add(newMessage[0]);

const recRef = firestore
.collection('users')
.doc(friendID)
.collection('chats')
.doc(cuser.uid)
.collection('messages');
await recRef.add(newMessage[0]);
 
setMessages(preMessage => GiftedChat.append(preMessage, newMessage));
}

 return ( 
   <View style={styles.container2}>
 <GiftedChat 
      messages={messages}
      onSend={(mes) => SaveMassage(mes)}
      user={{ 
        _id: cuser.uid, }}
    />
     </View>
  );
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    },
   container2: {
    flex: 2,
    paddingTop:Constants.statusBarHeight,
    backgroundColor: 'white',
    textAlign: "center" ,
    justifyContent:"center",
    padding: 1,
    display:"flex",
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

input: {
    backgroundColor: '#F0EBE3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '80%'
  }
});