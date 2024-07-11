"use client"
import axios from "axios";
import React,{useEffect, useState} from "react";

import AllProduct from "./Product";

const Product = () => {
const [prod,setProd]=useState([])
const getProd=()=>{
  axios
  .get("http://localhost:4000/api/property/getAll")
  .then((response) => {
    setProd(response.data);
  })
  .catch((err) => {
    console.log(err);
  });
}
useEffect(()=>{getProd()},[])
  return (
    <>
    <>
        {prod.map((el, index) => (
          <div key={index}>
            <AllProduct data={el} />
          </div>
        ))}
      </>
     </>
  )
}

export default Product
