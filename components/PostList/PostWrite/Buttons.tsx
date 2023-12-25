'use client';

import { FaPlus, FaImage, FaVideo, FaUpload } from 'react-icons/fa'
import { useState } from 'react';
import s from './style.module.css';

function Buttons() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className={s.buttons}>
      <button 
        type='button' 
        className='add btn' 
        onClick={() => setClicked(!clicked)}
      >
        <FaPlus size={20} />
      </button>
      {clicked && (
        <div className={s.options}>
          <button type='button' className='add btn'>
            <FaImage size={20} />
            <div className={s.tooltip}>Insert an image</div>
          </button>
          <button type='button' className='add btn'>
            <FaVideo size={20} />
            <div className={s.tooltip}>Insert a video</div>
          </button>
          <button type='button' className='add btn'>
            <FaUpload size={20} />
            <div className={s.tooltip}>Upload the post</div>
          </button>
        </div>
      )}
    </div>
  )
}

export default Buttons