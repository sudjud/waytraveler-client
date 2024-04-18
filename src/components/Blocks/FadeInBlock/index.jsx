import block from '../block.module.sass'
import mountains from '../../../assets/img/mountains.png'
import { useState } from 'react';

function FadeIn() {

  return (
    <div className={block.fadeIn}>
      <div style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
        }} className={block.black}></div>
      <div className={block.fadeIn__title}>
        Сайт, посвященный красоте и&nbsp;величественности вайнахского края
      </div>
      <div className={block.fadeIn__sub}>

      </div>
      <img src={mountains} className={block.fadeIn__image} alt="" />
    </div>
  )
};
export default FadeIn;