import React, { useState, useEffect } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, SafeAreaView, StatusBar, Button,TouchableOpacity,Platform } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import '@firebase/auth';
import { firebase } from '@firebase/app';
import firestore from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import '@firebase/storage';

import ItemScreen from './ItemScreen';
import ItemCard from './ItemCard';
import RoomScreen from './Room';
import ChatScreen from './Chat';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App({ navigation }){


  return ( 


<Tab.Navigator initialRouteName={'Feed'} style={{backgroundColor:"#E4DCCF"}} >
<Tab.Screen name="Feed" component={FeedScreen} options={{headerShown: false,
tabBarLabel: 'Home',
tabBarIcon: ({ color, size }) => (
<MaterialCommunityIcons name="home" color={"#7D9D9C"} size={size} />
),
}}
/>
<Tab.Screen  name="Wish" component={WishScreen} options={{headerShown: false,
tabBarLabel: 'Wish',
tabBarIcon: ({ color, size }) => (
<MaterialCommunityIcons name="head-heart" color={"#7D9D9C"} size={size} />
),
}}
/>
<Tab.Screen  name="MyProfile" component={MyScreen} options={{headerShown: false,
tabBarLabel: 'Profile',
tabBarIcon: ({ color, size }) => (
<MaterialCommunityIcons name="account-heart" color={"#7D9D9C"} size={size} />
),
}}
/>

<Tab.Screen  name="" component={SettingScreen} options={{headerShown: false,
tabBarLabel: 'Setting',
tabBarIcon: ({ color, size }) => (
<MaterialCommunityIcons name="apps" color={"#7D9D9C"} size={size} />
),
}}

/>
</Tab.Navigator>
  );
}






function FeedScreen({ navigation }) {
return (

<View style={styles.container}>
<TouchableOpacity>   
<MaterialCommunityIcons activeOpacity={0.7} style={styles.plus} name="heart-plus" color={"#FBA1A1"} size={100} onPress={() => navigation.push('Plus')} />
</TouchableOpacity>

<Stack.Navigator >
<Stack.Screen options={{ headerShown: false }}  name="Item" component={ItemScreen}  />
</Stack.Navigator>

</View>

);
}

function WishScreen({ navigation }) {
return (
<View style={styles.container}>

<Stack.Navigator >
<Stack.Screen options={{ headerShown: false }}  name="Room" component={RoomScreen}  />
<Stack.Screen name="Chat" component={ChatScreen} />
</Stack.Navigator>
</View>
);
}





function MyScreen({ navigation }) {

const [cuser, setCuser] = useState('');
const [name, setName] = useState('');
const [image, setImage] = useState('');
const [items , setItems] = useState([]);
const [users , setUsers] = useState([]);

useEffect(() => {
 async function CheckLogin(){
   firebase.auth().onAuthStateChanged((user) => {
     if (user) {
        setCuser(user);
        
        const docRef = firestore.collection('users').doc(user.uid);

        docRef.get().then((doc) => {
          setName(doc.data().name);
        });

        let storageRef = firebase.storage().ref();
        let picRef = storageRef.child(user.uid + '.jpg').getDownloadURL();

        picRef.then((url) => setImage(url));
     }
   });
  
  }
CheckLogin();
   }, []);



useEffect(() => {
  async function AskPer(){
    if(Platform.OS !== 'web'){
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(status !== 'granted'){
        alert('Need Permission');
      }
    }
  }
  AskPer();
},[]);



async function UploadPic(){
    let result = await ImagePicker.launchImageLibraryAsync();
    if(!result.cancelled){
      let response = await fetch(result.uri);
      let blob = await response.blob();

    let storageRef = firebase.storage().ref();
    let picRef = storageRef.child(cuser.uid + '.jpg');

    picRef.put(blob).then((pic) => {
      setImage(result.uri);
    });

    }
  }





return (
<View style={styles.container}>
<TouchableOpacity onPress={() => UploadPic()}>
<Image source={image =='' ? require('../assets/unknown-person.jpg') : {uri:image}} style={{borderColor:"#FBA1A1",borderWidth:5,borderRadius: '50%' ,marginBottom: 5, alignSelf: "center",width:150,height:150}} />
</TouchableOpacity>





<Text style={{ fontSize:20, fontWeight: 'bold', color:"#576F72", alignSelf: "center"}}>ยินดีต้อนรับ { name }</Text>



</View>





);
}

function SettingScreen ({ navigation }) {
  async function Logout(){
  await firebase.auth().signOut();
  navigation.reset({index: 0,routes:[{name: 'Login'}]});
}
return (
<View style={styles.container}>

<TouchableOpacity >
<Text style={styles.retext} onPress={() => alert("โทร.066448247")}>ติดต่อสอบถาม</Text>
</TouchableOpacity>

<TouchableOpacity >
<Text  style={styles.retext} onPress={() => Logout()}>ออกจากระบบ</Text>
</TouchableOpacity>

</View>
);
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
     color: 'grey',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop:'5%',
    textDecorationColor:'#576F72',
  },
  plus: {
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