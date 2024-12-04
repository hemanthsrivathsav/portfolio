import { useEffect, useState } from 'react';

import Badge  from './components/badges';

import { FaMapMarkerAlt, FaGlobe, FaUserGraduate, FaUniversity, FaClock } from 'react-icons/fa';
import { FiSmile } from 'react-icons/fi';

import './App.css'




function App() {

  const text = 'hemanthsrivathsav@gmail.com'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    } catch (err) {
      alert('Failed to copy text: ' + err);
    }
  };

  const ar =["Python","React","Tensorflow","SQL","Machine Learning","JavaScript","AI"]

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
    <div className='content-wrapper mx-auto max-w-screen-md md:max-w-full bg-slate-400 dark:bg-neutral-900 p-8 h-full w-full content-center justify-center '>
      
    <div className='  grid w-max gap-2 md:gap-1 md:w-4/5 md:mx-auto p-2 grid-cols-1 md:grid-cols-2 justify-center items-center content-center md:bg-gray-900 text-sm font-normal font-sans:system-ui '>
       
        <div className=' dark grid h-auto items-end grid-cols-1 border border-slate-600 bg-gray-900 md:grid-cols-2 gap-3 p-3 rounded-md ' >
          {/* Projects Section */}

          <div className='flex flex-col gap-2 bg-slate-300 dark:bg-slate-700/30 border border-slate-600/30 shadow-neon text-white items-center justify-center rounded-md p-4 bg-opacity-60'>
            <div className='relative'>
              <div className='flex items-center justify-centter '>
                <span className='text-7xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent'>
                  5
                </span>
                <span className='text-5xl font-bold text-purple-500'> + </span>
              </div>
              <h1 className='absolute bottom-0 left-1/3 transform -translate-x-10 translate-y-3 text-lg text-gray-300 font-bold px-2 rounded-md'>
                Projects
              </h1>
            </div>
          </div>
          
           {/* Experience Section */}
           <div className='flex flex-col gap-2 bg-slate-700/30 border border-slate-600/30 shadow-neon text-white items-center justify-center rounded-md p-4 bg-opacity-60'>
            <div className='relative'>
              <div className='flex content-start items-center justify-center'>
                <span className='text-7xl  font-bold bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent'>
                  1
                </span>
                <span className='text-5xl font-bold text-green-400'>+</span>
              </div>
              <h1 className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 text-lg text-gray-300 font-bold px-2 rounded-md'>
                Experience
              </h1>
            </div>
          </div>



        </div>


      <div className=" row-span-2 grid border-solid border  bg-gray-900 border-slate-600 rounded-md gap-3 p-3">
        <div className=" font-bold text-base bg-neutral-100 rounded-md ">
          <h1>My Stack !</h1>
        </div>
        <div className="container flex justify-center items-center text-white text-2xl ">
          <div className={`scrolling-text ${isAnimating ? 'animate' : ''}`}>
            <div className="text-4xl font-bold " >{ar[currentIndex]}</div>
          </div>
        </div>
      </div>


      <div className=' items-end  grid grid-cols-2 md:grid-rows-1 md:grid-flow-col gap-3 p-3  border border-slate-600  bg-gray-900  rounded-md '>

        <div className='  flex flex-col gap-1 bg-slate-700/30 border border-slate-600/30 shadow-neon text-white rounded-md p-2  bg-opacity-60 ' >
          <h1  className='p-1'>Resume</h1>

          <div className='flex gap-1 justify-evenly '>

            {/* DOWNLOAD  */}
            <a href="Resume.pdf" download="Hemanth's_Resume">
              <div className='cursor-pointer flex p-2 bg-slate-700 rounded-sm hover:bg-slate-900'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                  <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                  <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                </svg>
              </div>
            </a>

            {/* 3D  */}
            <a href="https://my.spline.design/untitled-0741ae787374a9c52a8ebcec7f96d867/" target="_blank"> 
              <div className=' cursor-pointer flex p-1 items-center justify-center w-9  bg-neutral-200 rounded-sm hover:bg-slate-100'>
                <img className='' src='./3d.png' width="32"  />
              </div>
            </a>
          </div>
        
        </div>

        <div className=' md:col-span-8 h-full flex flex-col gap-1 bg-slate-700/30 border border-slate-600/30 shadow-neon text-white items-center justify-center rounded-md p-2  bg-opacity-60 ' >
          <h1> Achievements </h1>
        </div>

      </div>


      <div className=' row-span-2  grid-cols-1 md:flex  md:grid-cols-4 gap-3 border border-slate-600 bg-gray-900  rounded-md p-3 '>

        <div className='grid col-span-1 grid-cols-2 md:w-72 md:grid-cols-1 gap-1 p-6  bg-neutral-200 rounded-md '>

          <Badge icon={<FaMapMarkerAlt className=" h-3 text-purple-400" />} text="India" />
          <Badge icon={<FaGlobe className="h-3 text-purple-400" />} text="English, Hindi, Telugu" />
          <Badge icon={<FaUserGraduate className="h-3 text-purple-400" />} text="Software Engineer" />
          <Badge icon={<FaClock className="h-3 text-purple-400" />} text="IST" />
          <Badge icon={<FaUniversity className="h-3 text-purple-400" />} text="KL University" />
          <Badge icon={<FiSmile className="h-3 text-purple-400" />} text="Good Boy" />

        </div>


        <div className=' grid col-span-2 gap-3 p-3 md:w-max rounded-md border border-slate-600 '>

            <div className=' bg-slate-600 rounded-md relative overflow-hidden'>
              <a href="https://hemanthsrivathsav.vercel.app/" target="_blank"> 
              <img className='rounded-sm w-full h-full object-cover' src='./favicon-c2.jpg' alt='Portfolio Game' />
              <h2 className='absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-neutral-100 text-base font-bold'>
              Explore my Portfolio Game</h2>
              </a>
            </div>

          <div className='bg-slate-600 rounded-md p-3 grid  gap-3  grid-cols-3 '>

                {/* GITHUB  */}
                <div className="grid items-center justify-center bg-neutral-600 rounded-md md:border-none md:bg-transparent  border border-slate-300 ">
                  <a href="https://github.com/hemanthsrivathsav" target="_blank">     
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="55" height="55" viewBox="0 0 256 256">
                      <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="2" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
                        <g transform="scale(2.59,2.59)">
                          <circle cx="50" cy="50" r="30" fill="#654db4" />
                          <path d="M50,83c-18.196,0 -33,-14.804 -33,-33c0,-18.196 14.804,-33 33,-33c18.196,0 33,14.804 33,33c0,18.196 -14.804,33 -33,33zM50,22c-15.439,0 -28,12.561 -28,28c0,15.439 12.561,28 28,28c15.439,0 28,-12.561 28,-28c0,-15.439 -12.561,-28 -28,-28z" fill="#8e66c1" />
                          <path d="M69.457,49.039c0,-3.321 -1.305,-6.334 -3.419,-8.573c0.396,-2.203 0.351,-5.301 -0.538,-7.966c-4.475,0 -8.114,3.447 -8.702,4h-12.804c-0.589,-0.552 -4.019,-4 -8.494,-4c-0.8,2.401 -1.087,5.233 -0.846,7.295c-2.518,2.286 -4.108,5.575 -4.108,9.245c0,6.908 5.599,12.459 12.507,12.459h2.447c-2.003,0.917 -3.635,2.756 -4,5c-2,0 -4.864,-0.182 -6.181,-2.158c-2.46,-3.69 -3.59,-3.69 -4.819,-3.69c-1.23,0 -1.33,1.23 -0.1,2.46c1.23,1.23 1.23,1.23 2.46,3.69c1.012,2.027 3.64,3.699 8.64,3.699v6.6c0,0 6.346,1.4 8.5,1.4c2.154,0 8.5,-1.4 8.5,-1.4v-9.445c0,-2.718 -1.681,-5.092 -4,-6.155h2.449c6.909,0 12.508,-5.553 12.508,-12.461z"
                            fill="#eeecd9"/>
                          <path d="M50,85c-19.299,0 -35,-15.701 -35,-35c0,-19.299 15.701,-35 35,-35c19.299,0 35,15.701 35,35c0,19.299 -15.701,35 -35,35zM50,17c-18.196,0 -33,14.804 -33,33c0,18.196 14.804,33 33,33c18.196,0 33,-14.804 33,-33c0,-18.196 -14.804,-33 -33,-33z"
                            fill="#1f212b"/>
                          <path d="M50,79c-15.99,0 -29,-13.009 -29,-29c0,-15.991 13.01,-29 29,-29c15.99,0 29,13.009 29,29c0,2.925 -0.435,5.812 -1.291,8.582c-0.082,0.263 -0.364,0.411 -0.625,0.33c-0.264,-0.082 -0.412,-0.361 -0.33,-0.625c0.827,-2.675 1.246,-5.462 1.246,-8.287c0,-15.439 -12.561,-28 -28,-28c-15.439,0 -28,12.561 -28,28c0,15.439 12.561,28 28,28c5.856,0 11.464,-1.788 16.217,-5.171c0.225,-0.16 0.536,-0.107 0.697,0.117c0.16,0.225 0.107,0.537 -0.117,0.697c-4.924,3.504 -10.732,5.357 -16.797,5.357z"
                            fill="#1f212b"/>
                        </g>
                      </g>
                    </svg>
                  </a>
                </div>

              {/* LINKEDIN  */}
                <div className="grid items-center justify-center rounded-md md:border-none md:bg-transparent bg-neutral-600  border border-slate-300 ">
                  <a href="https://www.linkedin.com/in/n-hemanth-srivathsav/" target="_blank"> 
                    <svg className='px-1' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="55" height="55" viewBox="0 0 64 64">
                    <linearGradient id="SUJNhpmDQDF27Y3OfwgfYa_44019_gr1" x1="19" x2="19" y1="24.858" y2="49.041" gradientUnits="userSpaceOnUse" spreadMethod="reflect">
                      <stop offset="0" stop-color="#6dc7ff"></stop>
                      <stop offset="1" stop-color="#e6abff"></stop>
                      </linearGradient>
                      <path fill="url(#SUJNhpmDQDF27Y3OfwgfYa_44019_gr1)" fill-rule="evenodd" d="M22 48L22 26 16 26 16 48 22 48z" clip-rule="evenodd"></path>
                      <linearGradient id="SUJNhpmDQDF27Y3OfwgfYb_44019_gr2" x1="19.382" x2="19.382" y1="15.423" y2="23.341" gradientUnits="userSpaceOnUse" spreadMethod="reflect">
                        <stop offset="0" stop-color="#6dc7ff"></stop>
                        <stop offset="1" stop-color="#e6abff"></stop>
                        </linearGradient>
                        <path fill="url(#SUJNhpmDQDF27Y3OfwgfYb_44019_gr2)" fill-rule="evenodd" d="M19.358,23c2.512,0,4.076-1.474,4.076-3.554 c-0.047-2.126-1.564-3.649-4.028-3.649c-2.465,0-4.076,1.475-4.076,3.601c0,2.08,1.563,3.602,3.981,3.602H19.358L19.358,23z" clip-rule="evenodd"></path><linearGradient id="SUJNhpmDQDF27Y3OfwgfYc_44019_gr3" x1="37.386" x2="37.386" y1="14.125" y2="49.525" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset="1" stop-color="#e6abff"></stop></linearGradient><path fill="url(#SUJNhpmDQDF27Y3OfwgfYc_44019_gr3)" fill-rule="evenodd" d="M26.946,48H34V35.911c0-0.648,0.122-1.295,0.313-1.758 c0.52-1.295,1.877-2.635,3.867-2.635c2.607,0,3.821,1.988,3.821,4.901V48h6V35.588c0-6.657-3.085-9.498-7.826-9.498 c-3.886,0-5.124,1.91-6.072,3.91H34v-4h-7.054c0.095,2-0.175,22-0.175,22H26.946z" clip-rule="evenodd"></path><linearGradient id="SUJNhpmDQDF27Y3OfwgfYd_44019_gr4" x1="32" x2="32" y1="6.5" y2="57.5" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#SUJNhpmDQDF27Y3OfwgfYd_44019_gr4)" d="M50,57H14c-3.859,0-7-3.141-7-7V14c0-3.859,3.141-7,7-7h36c3.859,0,7,3.141,7,7v36 C57,53.859,53.859,57,50,57z M14,9c-2.757,0-5,2.243-5,5v36c0,2.757,2.243,5,5,5h36c2.757,0,5-2.243,5-5V14c0-2.757-2.243-5-5-5H14z"></path>
                    </svg>
                  </a>
                </div>

              {/* EMAIL  */}
              <div className="grid items-center md:border-none md:bg-transparent justify-center bg-neutral-600 rounded-md border border-slate-300 " onClick={handleCopy} >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="55" height="55" viewBox="0 0 100 100">
                <polygon fill="#f16e7c" points="29.434,25.293 50,40.657 70.566,25.293 70.566,48 50,63 29.434,48"></polygon>
                <path fill="#ead032" d="M70.566,47.554L87.91,34.849v-4.808c0-5.002-4.055-9.056-9.056-9.056h-2.046l-6.242,4.308	C70.566,25.293,70.566,47.554,70.566,47.554z"></path>
                <path fill="#e85654" d="M29.434,47.554L12.089,34.849v-4.808c0-5.002,4.055-9.056,9.056-9.056h2.046l6.242,4.308	L29.434,47.554L29.434,47.554z"></path>
                <path fill="#8cc78c" d="M70,48l18.362-13.638v38.926c0,3.155-2.557,5.712-5.712,5.712H70V48z"></path>
                <path fill="#40a6dd" d="M30,48L11.638,34.362v38.926c0,3.155,2.557,5.712,5.712,5.712H30V48z"></path>
                <path fill="#1f212b" d="M78.99,20c-2.186,0-4.265,0.695-6.012,2.011L50,39.328L27.021,22.011C25.274,20.695,23.195,20,21,20	c-5.514,0-10,4.486-10,10v44c0,3.309,2.691,6,6,6h13c0.553,0,1-0.447,1-1V50.092L49.4,63.8c0.18,0.13,0.39,0.2,0.6,0.2	s0.41-0.06,0.59-0.19L69,50.514V79c0,0.553,0.447,1,1,1h13c3.309,0,6-2.691,6-6V30C89,24.486,84.514,20,78.99,20z M74.182,23.608	C75.579,22.557,77.242,22,79,22c4.411,0,8,3.589,8,8v4.799L71,46.724V46.6V26.006L74.182,23.608z M21.01,22	c1.748,0,3.411,0.557,4.809,1.608L29,26.006V46.6v0.124L13,34.799V30C13,25.589,16.589,22,21.01,22z M29,78H17c-2.206,0-4-1.794-4-4	V36.047l16,11.924v0.823V49V78z M50.01,61.76L30,47.322V26.76l19.398,14.619c0.017,0.013,0.037,0.015,0.054,0.026	c0.059,0.039,0.122,0.064,0.187,0.089c0.057,0.022,0.111,0.047,0.17,0.059c0.066,0.013,0.13,0.011,0.197,0.01	c0.061,0,0.12,0.002,0.18-0.009c0.062-0.012,0.12-0.038,0.18-0.062c0.063-0.025,0.124-0.049,0.181-0.087	c0.017-0.011,0.037-0.013,0.054-0.026L70,26.76v20.562L50.01,61.76z M83,78H71V49.07v-0.174V48.5v-0.528l16-11.924V74	C87,76.206,85.206,78,83,78z"></path><path fill="#1f212b" d="M16.5,61c0.276,0,0.5-0.224,0.5-0.5v-2c0-0.276-0.224-0.5-0.5-0.5S16,58.224,16,58.5v2	C16,60.776,16.224,61,16.5,61z"></path><path fill="#1f212b" d="M16.5,52c0.276,0,0.5-0.224,0.5-0.5v-7c0-0.276-0.224-0.5-0.5-0.5S16,44.224,16,44.5v7	C16,51.776,16.224,52,16.5,52z"></path><path fill="#1f212b" d="M24.5,74h-7c-0.275,0-0.5-0.225-0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5S16,63.224,16,63.5v10	c0,0.827,0.673,1.5,1.5,1.5h7c0.276,0,0.5-0.224,0.5-0.5S24.776,74,24.5,74z"></path><path fill="#1f212b" d="M42.801,40.16c-0.22-0.164-0.532-0.123-0.7,0.099c-0.166,0.221-0.122,0.534,0.099,0.7l2.047,1.542	c0.09,0.067,0.195,0.101,0.301,0.101c0.151,0,0.301-0.068,0.399-0.199c0.166-0.221,0.122-0.534-0.099-0.7L42.801,40.16z"></path><path fill="#1f212b" d="M46.444,42.905c-0.219-0.164-0.533-0.123-0.7,0.099c-0.166,0.221-0.122,0.534,0.099,0.7l2.914,2.195	C48.847,45.967,48.952,46,49.058,46c0.151,0,0.301-0.068,0.399-0.199c0.166-0.221,0.122-0.534-0.099-0.7L46.444,42.905z"></path><path fill="#1f212b" d="M55.306,41.587l-3.337,2.514c-0.221,0.166-0.265,0.479-0.099,0.7C51.969,44.932,52.118,45,52.27,45	c0.105,0,0.211-0.033,0.301-0.101l3.337-2.514c0.221-0.166,0.265-0.479,0.099-0.7C55.839,41.464,55.524,41.423,55.306,41.587z"></path><path fill="#1f212b" d="M58.682,39.044l-1.778,1.339c-0.221,0.166-0.265,0.479-0.099,0.7	c0.099,0.131,0.248,0.199,0.399,0.199c0.105,0,0.211-0.033,0.301-0.101l1.778-1.339c0.221-0.166,0.265-0.479,0.099-0.7	C59.215,38.92,58.9,38.88,58.682,39.044z"></path><path fill="#1f212b" d="M66.899,33.479c-0.167-0.222-0.481-0.263-0.7-0.099l-5.919,4.46c-0.221,0.166-0.265,0.479-0.099,0.7	c0.099,0.131,0.248,0.199,0.399,0.199c0.105,0,0.211-0.033,0.301-0.101l5.919-4.459C67.021,34.014,67.065,33.7,66.899,33.479z"></path><path fill="#1f212b" d="M16.5,56c0.276,0,0.5-0.224,0.5-0.5v-1c0-0.276-0.224-0.5-0.5-0.5S16,54.224,16,54.5v1	C16,55.776,16.224,56,16.5,56z"></path>
                </svg>
              </div>



          </div>

        </div>

      </div>


      <div className=' grid p-3 gap-3 border border-slate-600 bg-gray-900  rounded-md '>

          <div className='  bg-slate-800   text-white rounded-md p-2 '>

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

