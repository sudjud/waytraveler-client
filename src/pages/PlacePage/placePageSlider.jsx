import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper';
import 'react-medium-image-zoom/dist/styles.css';

function PlacePageSlider(params) {
  const { images } = params;

  return (
    <>
      <Swiper
        style={{ width: window.innerWidth > 768 ? "60vw" : "100vw", height: "640px", WebkitBoxShadow: '0px 0px 36px 12px rgba(0,0,0,0.74)', 
        boxShadow: '0px 0px 36px 12px rgba(0,0,0,0.74)' }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.url}
              alt={`Slide ${index}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default PlacePageSlider;