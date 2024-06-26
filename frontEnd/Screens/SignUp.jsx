import { StyleSheet,View, Text, TextInput, Button,Image, ScrollView ,TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import React ,{useState,useEffect}from 'react'
import { Formik } from 'formik'
import axios from "axios"
import { APP_API_URL } from '../env'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation,useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const SignUp = ({route}) => {
  const { showCINImage } = route.params;
  const navigation = useNavigation()
  const [image,setImage]=useState(null)
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [CINImage, setCINImage] = useState("");

  
  const handleSignUp = async (
    image,
    FirstName,
    LastName,
    email,
    Password,
    DateOfBirth,
    gender,
    CINImage,
    isOwner
  ) => {
    if (!image || !FirstName || !LastName || !email || !Password || !DateOfBirth || !gender) {
      alert('Please enter your data');
      return;
    }

    if (isOwner && !CINImage) {
      alert('Please provide your CIN Image');
      return;
    }

    const data = {
      image,
      FirstName,
      LastName,
      email,
      Password,
      DateOfBirth,
      gender,
    };

    if (isOwner) {
      data.CINImage = CINImage;
    }

    try {
      const res = await axios.post(
        `${APP_API_URL}/${isOwner ? 'owner' : 'user'}/reg`,
        data
      );
      alert('Signup successful');
      navigation.navigate('Login', { screen: 'Login' });
      console.log('Signup:', res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
      setImage(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
    const handleCameraLaunch = async () => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
  
  
    const handleSignup = (isOwner) => {
      SignUp(
        image, 
        FirstName,
        LastName,
        email,
        Password,
        DateOfBirth,
        gender,
        CINImage,
        isOwner
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

onPress={pickImage}
   >
            <Image 
source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s' }}
style={styles.profimges} 

/>
<Button title="Camera" onPress={async () => {
              handleCameraLaunch(true);
          }}  />
</TouchableOpacity> 
<View>
  
             
                </View>
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
             {showCINImage && (
                <View>
                  <Text style={styles.label}>CIN Image</Text>
                  <View style={styles.inputWrapper(touched.CINImage ? 'blue' : 'gray')}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={'gray'}
                    />
                    <View style={{ marginLeft: 5 }}>
                      <TextInput
                        onChangeText={(e) => setCINImage(e)}
                        placeholder="CINImage"
                      />
                    </View>
                  </View>
                </View>
              )}
             <View  style={{marginTop:20}}>
             <Button title="SignUp" 
             onPress={()=>handleSignup(false)}
              style={{marginTop:20,borderRadius:12,borderWidth:1}} />
 {showCINImage && (
                  <Button
                    title="Sign Up as Owner"
                    onPress={() => handleSignup(true)}
                    style={{ marginTop: 20, borderRadius: 12, borderWidth: 1 }}
                  />
                )}
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
  camera: {
    height: 800,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});