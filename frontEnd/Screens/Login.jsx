import { StyleSheet,View, Text, TextInput, Button} from 'react-native'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { APP_API_URL } from '../env';
import SessionStorage from "react-native-session-storage";
const Login = () => {
  const navigation = useNavigation()
 
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [token,setToken]=useState("")
  const logIn = async( ) => {

   
      try {
        const res= await axios.post(`${APP_API_URL}/owner/log/${email}`, {
        Password:Password,
        
      })
      SessionStorage.setItem("email",email)
     
        alert("login")
        
       


        } catch (err) {
        console.error(err)
      }
     
  };
  
  const handleLogIn = () => {
    logIn();

    navigation.navigate("Navigation",{screen:"BottomNavigation"})
   
  };
  return (
    
    
    <View style={styles.container}>
    <View style={styles.container}>

    <View style={styles.wrapper}>
    <View>
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputWrapper(email? 'blue' : 'gray')}>
        <MaterialCommunityIcons
          name="email-outline"
          size={20}
          color={'gray'}
        />
        <View  style={{ marginLeft: 5 }}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
        />
      </View>
</View>
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWrapper(Password ? 'blue' : 'gray')}>
        <MaterialCommunityIcons
          name="lock-outline"
          size={20}
          color={'gray'}
        />
              <View style={{ marginLeft: 5 }}>
                   <TextInput
                     onChangeText={(pass)=>setPassword(pass)}
                     value={Password}
                     placeholder="Password"
                     secureTextEntry
                   />
                 </View>
      </View>

      <View  style={{marginTop:30,borderRadius:50}}>
             <Button title="Login" 
             onPress={handleLogIn}
              style={{marginTop:30,borderRadius:80,borderWidth:5}} />

             </View>
    </View>
    </View>
    </View>
    </View>
  )
}

export default Login
const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:20,
  // backgroundColor:"white",

  
    },
    inputWrapper:(borderColor)=>(
     { 
      borderColor:borderColor,
        backgroundColor:"white",
        borderWidth:1,
      height:50,
    borderRadius:12,
  flexDirection:"row",
  paddingHorizontal:15,
  alignItems:"center"
  }
    ),
    wrapper:{
      marginBottom:20
    },
    label:{
      fontFamily:"regular",
      fontsize:10,
      marginBottom:4,
      marginEnd:4, 
      textAlign:"left"
    }
  })