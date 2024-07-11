"use client"
import React,{useState,useEffect} from 'react'
import axios from "axios";
import User from './User';

const page = () => {
   
    const [user, setUser] = useState<Array>([])
    const getUser=()=>{
        axios
        .get("http://localhost:4000/api/user/get")
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    useEffect(()=>{getUser()},[])
  return (
   <div className='divide-y  rounded-lg shadow-lg mt-9 ml-4 mr-4'>
  <>
      {user.map((el, index) => (
        <div key={index}>
          <User data={el} />
        </div>
      ))}
    </>
   </div>
  )
}

export default page