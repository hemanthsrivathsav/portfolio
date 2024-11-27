import React, { useState } from 'react'

export const Toggle = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <>
      <label className=' inline-flex cursor-pointer select-none items-center'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        
        <span
          className={`slider  flex h-4 w-8 items-center rounded-full p-1 duration-200 ${
            isChecked ? 'bg-[#212b36]' : 'bg-[#CCCCCE]'
          }`}
        >
          <span
            className={`dot h-full w-1/3 rounded-lg bg-white duration-200 ${
              isChecked ? 'translate-x-[16px]' : ''
            }`}
          ></span>
        </span>
        
      </label>
    </>
  )
}

