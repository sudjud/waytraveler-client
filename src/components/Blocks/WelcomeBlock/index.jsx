import block from '../block.module.sass';
import welcomeVideo from '../../../assets/welcomeVideo.mp4';
import { useState } from 'react';

function Welcome() {
  const [ scrollValue, setScrollValue ] = useState(window.scrollY);
  window.addEventListener('scroll', () => {
    setScrollValue(window.scrollY)
  })

  return (
    <>
    <div className={block.welcome}>
      {/* <div style={{backgroundColor: `rgba(0, 0, 0, ${scrollValue / 1000})`}} className={block.black}></div> */}
      <video autoPlay loop muted>
        <source src={welcomeVideo} type="video/mp4" />
      </video>
    </div>
    </>
  )
};
export default Welcome;