import { StyleSheet,Image} from 'react-native'
import React from 'react'

const ResImage = ({source,width,height,radius}) => {
  return (
  <Image 
  source={{uri:source}}
  style={styles.image(width,height,radius)}
  />
  )
}

export default ResImage

const styles = StyleSheet.create({
    image:(width,height,radius)=>({
        width:width,
        height:height,
        borderRadius:radius,
        resizeMode:'cover'
    })
})