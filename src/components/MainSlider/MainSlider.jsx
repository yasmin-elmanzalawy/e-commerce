import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Slider from "react-slick";
import axios from "axios";
import img_1 from '../../assets/imgs/61cSNgtEISL._AC_SY200_.jpg'
import img_2 from '../../assets/imgs/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import img_3 from '../../assets/imgs/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import img_4 from '../../assets/imgs/41nN4nvKaAL._AC_SY200_.jpg'



export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
   return (
   <div className='max-w-[600px] m-auto my-10'>
     <div className='grid md:grid-cols-12 '>
    <div className='md:col-span-8 py-2'>
    <Slider {...settings}>
      <img src={img_1} className='m-auto h-[300px] object-contain' alt="" />
      <img src={img_4} className='m-auto h-[300px] object-contain' alt="" />
    </Slider>
    </div>
    <div className='md:col-span-4 py-2 '>
      <img src={img_3} alt="" />
      <img src={img_2} alt="" />
    </div>
  </div>
   </div>
  )
}
