import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useRef } from 'react';


function SliderReactjs({children,className,refs,show,scroll}) {
    const [currentSlide, setCurrentSlide] = useState(0);
   const sliderRef = useRef(null);
 
//    const handlePrevClick = () => {
//     sliderRef.current.slickPrev();
//   };

//   const handleNextClick = () => {
//     sliderRef.current.slickNext();
//   };

   const settings = {
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: show ,
     slidesToScroll: scroll,
     arrows: false,
     beforeChange: (oldIndex, newIndex) => {
       setCurrentSlide(newIndex);
     },
     responsive: [
       {
         breakpoint: 768,
         settings: {
           arrows: false,
         },
       },
     ],
 };
    return ( 
           <Slider ref={refs} {...settings} className={className}>{children}</Slider>
     );
}

export default SliderReactjs;