import React , {useState,useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Image,TextInput,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Stack = createStackNavigator();
import firestore from '../firebase';
import { firebase } from '@firebase/app';
import '@firebase/auth';


export default function PlusScreen({ navigation }) {
const [name, setName] = useState('');
const [desc, setDesc] = useState('');
const [image, setImage] = useState('');
const [cuser, setCuser] = useState('');
const [con, setCon] = useState('');


useEffect(() => {
 async function CheckLogin(){
   firebase.auth().onAuthStateChanged((user) => {
     if (user) {
        setCuser(user);
        
        const docRef = firestore.collection('users').doc(user.uid);

        docRef.get().then((doc) => {
          setName(doc.data().name);
        });


     }
   });
  
  }
CheckLogin();
   }, []);


  




async function Plus(){
const collRef = firestore.collection('items');
collRef.add({
name: name,
desc: desc,
con: con,
createdAt : firebase.firestore.FieldValue.serverTimestamp(),
        });
}



  return (
    <View style={styles.container}>
    <MaterialCommunityIcons activeOpacity={0.7} name="close-circle" color={"white"} size={50} onPress={() => navigation.goBack()} />
    <Text style={styles.retext}> รายละเอียดของที่อยากส่งต่อ </Text>
    <Text style={styles.text}> ชื่อสิ่งของที่จะส่งต่อ </Text>
<TextInput style={styles.input} placeholder='ชื่อ' onChangeText={setName} />
    <Text style={styles.text}> รายละเอียดสิ่งของที่จะส่งต่อ </Text>
<TextInput style={styles.input2} placeholder='รายละเอียด' onChangeText={setDesc} />
    <Text style={styles.text}> ติดต่อได้ที่ </Text>
<TextInput style={styles.input2} placeholder='ชื่อในแอป /เบอร์โทร/ไลน์' onChangeText={setCon} />


      <TouchableOpacity>
<MaterialCommunityIcons onPress={() => Plus(navigation.navigate('Home'))} activeOpacity={0.7} name="arrow-down-circle" style={{paddingTop:'30%'}} color={"white"} size={120} />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBA1A1',
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
     color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop:'5%',
    textDecorationColor:'#576F72',
  },
    text: {
     color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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
  textDecorationColor:'black',
    backgroundColor: '#F0EBE3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    textAlign:'center',
    width: '80%',
    fontWeight: 'bold',
    opacity:'80%',
    } ,
input2: {
    backgroundColor: '#F0EBE3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    height:100,
    textAlign:'center',
    width: '80%',
    fontWeight: 'bold',
    opacity:'80%',
  }
});
