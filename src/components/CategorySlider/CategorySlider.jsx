import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Slider from "react-slick";
import axios from "axios";


export default function CategorySlider() {


  const [categories, setCategories] = useState([])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
  };

async function getCategories(){
   const {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
   console.log(data);
   setCategories(data.data);
  }

  useEffect(()=>{
    console.log('mounting');
    getCategories();
  },[])


  return (
    <div className="overflow-hidden">
       <Slider {...settings}>
      {
        categories.map((c)=> <div key={c._id} >
          <img className='h-[200px] w-full object-cover' src={c.image} alt="" />
          <h3 className='font-semibold text-2xl'>{c.name}</h3>
        </div>)
      }
    </Slider>
    </div>
  )
}
