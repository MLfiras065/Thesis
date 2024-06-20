import { StyleSheet,View, Text, TextInput, Button,Image, ScrollView ,TouchableOpacity} from 'react-native'
import React ,{useState,}from 'react'
import { Formik } from 'formik'
// import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const SignUp = () => {
    const navigation = useNavigation()
  return (
    <ScrollView
    style={[{ flex: 1, backgroundColor: "#F0F0F0" }, styles.container]}

    // behavior={Platform.OS === "ios" ? "position" : null} 
    // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    
  >
      <Formik
      initialValues={{username:"",email:"",password:""}}
    
    //   onSubmit={(value)=>{handleSignup(value),console.log(value);}}
      >
          {({ handleChange, 
        //   touched,
          handleSubmit, values }) => (
             <View style={styles.wrapper}>
             <View>
   <TouchableOpacity 
//    onPress={pickImage}
   >
            <Image 
source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/365/244/884/uchiha-itachi-naruto-shippuuden-anbu-silhouette-wallpaper-preview.jpg' }}
style={styles.profimges} 

/>
</TouchableOpacity> 
             </View>
             <View>
               <Text style={styles.label}>FirstName</Text>
               <View style={styles.inputWrapper("test" ? 'blue' : 'gray')}>
               <AntDesign name="user" size={20} color="gray" />
                 <View style={{ marginLeft: 5 }}>
                   <TextInput
                    //  onChangeText={handleChange('username')}
                    //  value={values.username}
                     placeholder="firstname"
                   />
                 </View>
               </View>
             </View>
             <View>
             <View>
               <Text style={styles.label}>LastName</Text>
               <View style={styles.inputWrapper("test" ? 'blue' : 'gray')}>
               <AntDesign name="user" size={20} color="gray" />
                 <View style={{ marginLeft: 5 }}>
                   <TextInput
                    //  onChangeText={handleChange('username')}
                    //  value={values.username}
                     placeholder="lastname"
                   />
                 </View>
               </View>
             </View>
             
               <Text style={styles.label}>Email</Text>
               <View style={styles.inputWrapper("touched.email" ? 'blue' : 'gray')}>
                 <MaterialCommunityIcons
                   name="email-outline"
                   size={20}
                   color={'gray'}
                 />
                 <View style={{ marginLeft: 5 }}>
                   <TextInput
                    //  onChangeText={handleChange('email')}
                    //  value={values.email}
                     placeholder="Email"
                   />
                 </View>
               </View>
             </View>
             <Text style={styles.label}>Password</Text>
             <View>
               <View style={styles.inputWrapper("touched.password" ? 'blue' : 'gray')}>
                 <MaterialCommunityIcons
                   name="lock-outline"
                   size={20}
                   color={'gray'}
                 />
                 <View style={{ marginLeft: 5 }}>
                   <TextInput
                    //  onChangeText={handleChange('password')}
                    //  value={values.password}
                     placeholder="Password"
                     secureTextEntry
                   />
                 </View>
               </View>
             </View>
             <Text style={styles.label}>date of birth</Text>
             <View>
               <View style={styles.inputWrapper("touched.password" ? 'blue' : 'gray')}>
                 <MaterialCommunityIcons
                   name="lock-outline"
                   size={20}
                   color={'gray'}
                 />
                 <View style={{ marginLeft: 5 }}>
                   <TextInput
                    //  onChangeText={handleChange('password')}
                    //  value={values.password}
                     placeholder="dateofbirth"
                     
                   />
                 </View>
               </View>
             </View>
             <Text style={styles.label}>Gender</Text>
             <View>
               <View style={styles.inputWrapper("touched.password" ? 'blue' : 'gray')}>
                 <MaterialCommunityIcons
                   name="lock-outline"
                   size={20}
                   color={'gray'}
                 />
                 <View style={{ marginLeft: 5 }}>
                   <TextInput
                    //  onChangeText={handleChange('password')}
                    //  value={values.password}
                     placeholder="gender"
                     
                   />
                 </View>
               </View>
             </View>
             <Text style={styles.label}>CIN Image</Text>
             <View>
               <View style={styles.inputWrapper("touched.password" ? 'blue' : 'gray')}>
                 <MaterialCommunityIcons
                   name="lock-outline"
                   size={20}
                   color={'gray'}
                 />
                 <View style={{ marginLeft: 5 }}>
                   <TextInput
                    //  onChangeText={handleChange('password')}
                    //  value={values.password}
                     placeholder="CIN Image"
                     
                   />
                 </View>
               </View>
             </View>
             <View  style={{marginTop:20}}>
             <Button title="SignUp" 
            //  onPress={handleSubmit}
              style={{marginTop:20,borderRadius:12,borderWidth:1}} />

             </View>
          </View>
             )}
       
      </Formik>
    </ScrollView>
  )
}

export default SignUp

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:20,
  backgroundColor:"white"
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
    },profimges:{
      resizeMode:"cover",
      width:100,
      height:100,
      borderColor:"white",
      borderWidth:2,
      borderRadius:90,
     
  
  },
  })