import { StyleSheet,View, Text, TextInput, Button,Image, ScrollView ,TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import React ,{useState,}from 'react'
import { Formik } from 'formik'
import axios from "axios"
import { APP_API_URL } from '../env'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const SignUp = () => {
    const navigation = useNavigation()
    const [image ,setImage] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [DateOfBirth, setDateOfBirth] = useState("");
    const [CINImage, setCINImage] = useState("");

  
    const SignUp = (
      image, 
      FirstName,
      LastName,
      email,
      Password,
      DateOfBirth,
      gender,
    CINImage
    ) => {
      axios
        .post(`${APP_API_URL}/owner/reg`, {
          image:image,
          FirstName:FirstName,
          LastName:LastName,
          email:email,
          Password:Password,
          DateOfBirth:DateOfBirth,
          gender:gender,
         CINImage:CINImage
        })
        .then((res) => {
          alert("signup");
          navigation.navigate('Login',{screen:"Login"})
          console.log("sign", res.data);
        })
        .catch((error) => {
          console.log( error);
        });
    };
  
  
  
  
    const handleSignup = () => {
      SignUp(
        image, 
        FirstName,
        LastName,
        email,
        Password,
        DateOfBirth,
        gender,
        CINImage
      );
    };
  
    return (

      <KeyboardAvoidingView behavior="padding" style={styles.container}>
 <ScrollView style={styles.scrollView}>

    
  
      <Formik
           onSubmit={handleSignup}
      >
          {({ touched,handL}) => (
             <View style={styles.wrapper}>
             <View>
   <TouchableOpacity 


   >
            <Image 
source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/365/244/884/uchiha-itachi-naruto-shippuuden-anbu-silhouette-wallpaper-preview.jpg' }}
style={styles.profimges} 

/>
</TouchableOpacity> 
             </View>
             <View>
               <Text style={styles.label}>FirstName</Text>
               <View style={styles.inputWrapper(touched.FirstName ? 'blue' : 'gray')}>
               <AntDesign name="user" size={20} color="gray" />
                 <View style={{ marginLeft: 5 }}>
                   <TextInput
                     onChangeText={(e)=>setFirstName(e)}
                    //  value={values.FirstName}
                     placeholder="FirstName"
                   />
                 </View>
               </View>
             </View>
             <View>
             <View>
               <Text style={styles.label}>LastName</Text>
               <View style={styles.inputWrapper(touched.LastName ? 'blue' : 'gray')}>
               <AntDesign name="user" size={20} color="gray" />
                 <View style={{ marginLeft: 5 }}>
                   <TextInput
                     onChangeText={(e)=>setLastName(e)}
                    // //  value={values.LastName}
                     placeholder="lastname"
                   />
                 </View>
               </View>
             </View>
             
               <Text style={styles.label}>Email</Text>
               <View style={styles.inputWrapper(touched.email ? 'blue' : 'gray')}>
                 <MaterialCommunityIcons
                   name="email-outline"
                   size={20}
                   color={'gray'}
                 />
                 <View style={{ marginLeft: 5 }}>
                   <TextInput
                     onChangeText={(e)=>setEmail(e)}
                    // //  value={values.email}
                     placeholder="Email"
                   />
                 </View>
               </View>
             </View>
             <Text style={styles.label}>Password</Text>
             <View>
               <View style={styles.inputWrapper(touched.password ? 'blue' : 'gray')}>
                 <MaterialCommunityIcons
                   name="lock-outline"
                   size={20}
                   color={'gray'}
                 />
                 <View style={{ marginLeft: 5 }}>
                   <TextInput
                     onChangeText={(e)=>setPassword(e)}
                   
                     placeholder="Password"
                     secureTextEntry
                   />
                 </View>
               </View>
             </View>
             <Text style={styles.label}>DateOfBirth</Text>
             <View>
               <View style={styles.inputWrapper(touched.DateOfBirth ? 'blue' : 'gray')}>
                 <MaterialCommunityIcons
                   name="lock-outline"
                   size={20}
                   color={'gray'}
                 />
                 <View style={{ marginLeft: 5 }}>
                   <TextInput
                     onChangeText={(e)=>setDateOfBirth(e)}
                    // //  value={values.DateOfBirth}
                     placeholder="dateofbirth"
                     
                   />
                 </View>
               </View>
             </View>
             <Text style={styles.label}>Gender</Text>
             <View>
               <View style={styles.inputWrapper(touched.gender ? 'blue' : 'gray')}>
                 <MaterialCommunityIcons
                   name="lock-outline"
                   size={20}
                   color={'gray'}
                 />
                 <View style={{ marginLeft: 5 }}>
                   <TextInput
                     onChangeText={(e)=>setGender(e)}
                    // //  value={values.gender}
                     placeholder="gender"
                     
                   />
                 </View>
               </View>
             </View>
             <Text style={styles.label}>CIN Image</Text>
             <View>
               <View style={styles.inputWrapper(touched.CINImage ? 'blue' : 'gray')}>
                 <MaterialCommunityIcons
                   name="lock-outline"
                   size={20}
                   color={'gray'}
                 />
                 <View style={{ marginLeft: 5 }}>
                   <TextInput
                     onChangeText={(e)=>setCINImage(e)}
                    // //  value={values.CINImage}
                     placeholder="CINImage"
                     
                   />
                 </View>
               </View>
             </View>
             <View  style={{marginTop:20}}>
             <Button title="SignUp" 
             onPress={handleSignup}
              style={{marginTop:20,borderRadius:12,borderWidth:1}} />

             </View>
          </View>
             )}
       
      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  scrollView: {
    paddingHorizontal: 40,
  },
  wrapper: {
    marginBottom: 20,
  },
  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: 'white',
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 15,
  }),
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
    textAlign: 'left',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  profimges: {
    resizeMode: 'cover',
    width: 100,
    height: 100,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#007BFF',
  },
});