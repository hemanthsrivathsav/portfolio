import { useEffect, useState } from 'react';

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
    }, 1500); // Change string every 3 seconds

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

            <a href="Resume.pdf" download="Hemanth's_Resume">
              <div className='cursor-pointer flex p-2 bg-slate-700 rounded-sm hover:bg-slate-900'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                  <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                  <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                </svg>
              </div>
            </a>

            <a href="https://my.spline.design/untitled-0741ae787374a9c52a8ebcec7f96d867/" target="_blank"> 
              <div className=' cursor-pointer flex p-1 items-center justify-center w-9  bg-slate-300 rounded-sm hover:bg-slate-100'>
                <img className=' ' src='./3d.png' width="25"  />
              </div>
            </a>
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
                .
              </div>

              <div className="grid items-center justify-center bg-yellow-500 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" opacity={0.9} viewBox="0 0 48 48">
                <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
                </svg>
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

