import { useEffect, useState } from 'react';

import {Toggle} from './components/modeToggle' ;

import Badge  from './components/badges';

import { FaMapMarkerAlt, FaGlobe, FaUserGraduate, FaUniversity, FaClock } from 'react-icons/fa';
import { FiSmile } from 'react-icons/fi';

import './App.css'




function App() {

  const ar =["Python","React","Tensorflow","Sql","Machine Learning","Js"]

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);


  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(false); // Reset animation
      setTimeout(() => {
        setIsAnimating(true); // Restart animation
        setCurrentIndex((prevIndex) => (prevIndex + 1) % ar.length);
      }, 50); // Small delay to reset animation
    }, 3000); // Change string every 3 seconds

    return () => clearInterval(interval);
  }, [ar.length]);




  return (
    <div className="">
    <div className='content-wrapper mx-auto max-w-screen-md md:max-w-full bg-slate-400 dark:bg-neutral-900 p-8  h-full w-full content-center justify-center '>
    <div className='  grid w-max gap-1 md:w-4/5 md:mx-auto p-2 grid-cols-1 md:grid-cols-2 justify-center items-center content-center border text-sm font-normal font-sans:system-ui '>
       
        <div className=' dark grid h-auto items-end grid-cols-1 border-solid border  bg-gray-900 border-orange-600  md:grid-cols-2 gap-3 p-3 rounded-md ' >
          <div className='  flex flex-col gap-1 bg-slate-300 dark:bg-slate-700/30 border border-slate-600/30 shadow-neon text-white items-center justify-center rounded-md p-2  bg-opacity-60 ' >
          <h1>Projects+</h1>
          </div>
          <div className=' flex flex-col gap-1 bg-slate-700/30 border border-slate-600/30 shadow-neon text-white items-center justify-center rounded-md p-2  bg-opacity-60 ' >
          <h1>Experiance +</h1>
          </div>
        </div>


      <div className=" row-span-2 grid border-solid border  bg-gray-900 border-orange-600  rounded-md gap-3 p-3">
        <div className=" bg-white/30 rounded-md ">
        <h1>My Stack !</h1>
        </div>
        <div className="container flex justify-center items-center text-white text-2xl ">
          <div className={`scrolling-text ${isAnimating ? 'animate' : ''}`}>
            <div className="" >{ar[currentIndex]}</div>
          </div>
        </div>
      </div>


      <div className=' items-end  grid grid-cols-2 md:grid-rows-1 md:grid-flow-col gap-3 p-3 border-solid border  bg-gray-900 border-orange-600  rounded-md '>

        <div className='  flex flex-col gap-1 bg-slate-700/30 border border-slate-600/30 shadow-neon text-white items-center rounded-md p-2  bg-opacity-60 ' >
          <h1  className='p-1'>Resume</h1>

          <div className='flex gap-1 justify-between '>
            <div className='cursor-pointer flex p-2 bg-slate-700 rounded-sm hover:bg-slate-900'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>
            </div>
            <div className=' cursor-pointer flex p-1 items-center justify-center w-9  bg-slate-300 rounded-sm hover:bg-slate-100'>
              <img className=' ' src='./3d.png' width="25"  />
            </div>
          </div>
        
        </div>

        <div className=' md:col-span-8 h-full flex flex-col gap-1 bg-slate-700/30 border border-slate-600/30 shadow-neon text-white items-center justify-center rounded-md p-2  bg-opacity-60 ' >
          <h1> Achievements </h1>
        </div>

      </div>


      <div className=' row-span-2 grid  grid-cols-1 md:grid-cols-2 gap-3 border-solid border bg-gray-900 border-orange-600  rounded-md p-3 '>

        <div className='grid grid-cols-2 gap-1 p-6  bg-white rounded-md '>

          <Badge icon={<FaMapMarkerAlt className="text-purple-400" />} text="India" />
          <Badge icon={<FaGlobe className="text-purple-400" />} text="English, Hindi, Telugu" />
          <Badge icon={<FaUserGraduate className="text-purple-400" />} text="Software Engineer" />
          <Badge icon={<FaClock className="text-purple-400" />} text="IST" />
          <Badge icon={<FaUniversity className="text-purple-400" />} text="KL University" />
          <Badge icon={<FiSmile className="text-purple-400" />} text="Good Boy" />

        </div>


        <div className=' grid gap-3 p-3 bg-white rounded-md '>

        <div className='bg-slate-600 rounded-md relative overflow-hidden'>
          <img className='rounded-sm w-full h-full object-cover' src='./favicon-c2.jpg' alt='Portfolio Game' />
          <h2 className='absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-700 text-base font-bold'>Explore my Portfolio Game</h2>
        </div>

          <div className='bg-slate-600 rounded-md p-3 grid gap-3  grid-cols-2 '>
              <div className=" bg-purple-500 rounded-md">
                
                <p>Dark Mode</p>
                <div className='p-1'>
                  <Toggle />
                </div>
              </div>

              <div className="bg-yellow-500 rounded-md">
              </div>
          </div>

        </div>

      </div>


      <div className=' grid p-3 gap-3  border-solid border bg-gray-900 border-orange-600  rounded-md '>

          <div className='  bg-slate-800  border-slate-600  text-white rounded-md p-2 '>

            <div className=' flex gap-1  items-center justify-start '>
              <div className=' rounded-full  bg-slate-900 border-cyan-50 border '>
                <img className=' rounded-full' src='./me.jpg' width="80"  />
              </div>
              <div>
                <div> <h1  className=' m-2 ml-4 p-1'> Navuluri Hemanth Srivathsav </h1> </div>
                <div className=' p-1 m-2 '><p className='text-sm hover:font-mono hover:font-medium'>Software Developer </p> </div>
              </div>
             
            </div>

            <div className=' flex gap-1  items-center justify-start '>
              <h5>This is the smaller info section below image</h5>
            </div>
            
          </div>
        
        <div className=' bg-white rounded-md '>
          <h1>This is below </h1>
        </div>
      </div>
      

 

      {/* <div className='   bg-black  rounded-md '></div> */}
      
   
    </div>
    </div>
    </div>
  )
}

export default App

