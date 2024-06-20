import { View, Text, ScrollView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import Login from './Login'
import SignUp from './SignUp'
import ResImage from '../Component/ResImg'
const Tab=createMaterialTopTabNavigator()
const TopTabNav = () => {
  return (
    <View>
        <ScrollView>
            <View style={{marginTop:10}}>
<ResImage
 source={'https://www.sme-news.co.uk/wp-content/uploads/2021/11/Login.jpg'}
 width={"100%"}
 height={250}
 mode={"contain"}
/>
            <Tab.Navigator style={{height:400}}>
    <Tab.Screen  name='Login' component={Login}/>
    <Tab.Screen  name='SignUp' component={SignUp}/>
      </Tab.Navigator>
            </View>
        </ScrollView>
      
    </View>
  )
}

export default TopTabNav