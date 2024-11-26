import { useState } from 'react'


import './App.css'




function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='grid  gap-1 w-max p-2 grid-cols-1 md:grid-cols-2 justify-center items-center content-center border font-normal font-sans:system-ui '>
      

        <div className=' grid h-auto items-end grid-cols-1 border-solid border border-orange-600  md:grid-cols-2 gap-3 p-3 rounded-md ' >
          <div className=' flex flex-col gap-1 bg-slate-700/30 border border-slate-600/30 shadow-neon text-white items-center justify-center rounded-md p-2  bg-opacity-60 ' >
          <h1>Projects+</h1>
          </div>
          <div className=' flex flex-col gap-1 bg-slate-700/30 border border-slate-600/30 shadow-neon text-white items-center justify-center rounded-md p-2  bg-opacity-60 ' >
          <h1>Experiance +</h1>
          </div>
        </div>


      <div className=" row-span-2 grid border-solid border border-orange-600  rounded-md gap-3 p-3">
        <div className=" bg-white/30 rounded-md ">.</div>
        <div className=" bg-white rounded-md">.</div>
      </div>


      <div className=' items-end  grid grid-cols-2 md:grid-rows-1 md:grid-flow-col gap-3 p-3 border-solid border border-orange-600  rounded-md '>

        <div className=' flex flex-col gap-1 bg-slate-700/30 border border-slate-600/30 shadow-neon text-white items-center rounded-md p-2  bg-opacity-60 ' >
          <h1  className='p-1'>Resume</h1>

          <div className='flex gap-1 justify-between '>
            <div className='flex p-2 bg-slate-700 rounded-sm hover:bg-slate-900'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>
            </div>
            <div className=' flex p-1 items-center justify-center w-9  bg-slate-300 rounded-sm hover:bg-slate-100'>
              <img className=' ' src='./3d.png' width="25"  />
            </div>
          </div>
        
        </div>

        <div className=' md:col-span-8 h-full flex flex-col gap-1 bg-slate-700/30 border border-slate-600/30 shadow-neon text-white items-center justify-center rounded-md p-2  bg-opacity-60 ' >
          <h1> Achievements </h1>
        </div>

      </div>


      <div className=' row-span-2 grid  grid-cols-1 md:grid-cols-2 gap-3 border-solid border border-orange-600  rounded-md p-3 '>

        <div className='  bg-white rounded-md '>.</div>

        <div className=' grid gap-3 p-3 bg-white rounded-md '>

          <div className='bg-slate-600 rounded-md '>.</div>
          <div className='bg-slate-600 rounded-md p-3 grid gap-3  grid-cols-2 '>
              <div className=" bg-purple-500 rounded-md">.</div>
              <div className="bg-yellow-500 rounded-md"></div>
          </div>

        </div>

      </div>


      <div className=' row-span-2 grid p-3 gap-3  border-solid border border-orange-600  rounded-md '>
        <div className=' bg-white rounded-md '>
          <div className='  bg-slate-800 text-white rounded-md p-2 '>

            <div className=' flex gap-1  items-center justify-start '>
              <div className=' rounded-full  bg-slate-900 border-cyan-50 border hover:bg-slate-900'>
                <img className=' rounded-full' src='./me.jpg' width="80"  />
              </div>
              <div>
                <div> <h1  className=' m-2 ml-4 p-1'> Navuluri Hemanth Srivathsav </h1> </div>
                <div className=' p-1 m-2 '><p className='text-sm hover:font-mono hover:font-medium'> I am a Software Developer </p> </div>
              </div>
             
            </div>

            <div className=' flex gap-1  items-center justify-start '>
              <h5>This is the smaller info section below image</h5>
            </div>
            
          </div>
        </div>
        <div className=' bg-white rounded-md '>
          <h1>This is below </h1>
        </div>
      </div>

 

      {/* <div className='   bg-black  rounded-md '></div> */}
      
   
    </div>
  )
}

export default App

