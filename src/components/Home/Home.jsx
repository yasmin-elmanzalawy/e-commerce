import React, { useState, useEffect } from 'react';
import Products from '../Products/Products';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';

export default function HomePage() {


  return (
   <div>
    <div>
      <MainSlider/>
    </div>

    <div>
      <CategorySlider/>
    </div>

    <div>
    <Products/>
    </div>
    
   </div>
  );
}
