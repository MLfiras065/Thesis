import * as React from 'react'
import * as SecureStore from 'expo-secure-store'
const AuthContext = React.createContext();
let token
 const Auth=()=>{
  
  const [state,dispatch]=React.useReducer(
    (prevState,action)=>{
      switch(action.type){
        case "RESTORE_TOKEN":return {
          ...prevState,token:action.token 
        }
        case "RESTORE_EMAIL":
          return {
          ...prevState,
          email:action.email
        }
      }
    }
  )
  React.useEffect(()=>{
    const getToken=async()=>{
try {
  token= await SecureStore.setItem("token")
} catch (error) {
  console.log(error);
}
dispatch({type:"RESTORE_TOKEN",token:token})
    }
    getToken()
  },[])
 }
 const Provider=({children})=>{

  return(
    <AuthContext.Provider value={{token}}>
   {children}
  </AuthContext.Provider>
  )
 }
 export  {Provider,Auth}