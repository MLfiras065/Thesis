"use client"
import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';

import AllOwner from './Owner';
const Owner = () => {
    const router=useRouter()
    const [owner, setOwner] = useState([])
    const getOwner=()=>{
        axios
        .get("http://localhost:4000/api/owner/getOwner")
        .then((response:any) => {
          setOwner(response.data);
          console.log("data",response.data);
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
    useEffect(()=>{getOwner()},[])
  return (
   <div className='divide-y  rounded-lg shadow-lg mt-9 ml-4 mr-4' >
  <>
      {owner.map((el, index) => (
        <div  key={index}>
          <AllOwner data={el} />
        </div>
      ))}
    </>
   </div>
  )
}

export default Owner