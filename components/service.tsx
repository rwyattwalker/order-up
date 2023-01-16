import React from 'react'
import {GiPencilBrush} from 'react-icons/gi'
import {FaLaptopCode} from 'react-icons/fa'
import {IoIosSpeedometer} from 'react-icons/io'
import {BiWorld} from 'react-icons/bi'
 type serviceProps = {
    name: string
  }
function Service({name}:serviceProps) {
  return (
    <div className='h-96 w-80 bg-[#222222] text-blue-100 flex flex-col my-4 text-center rounded-md mx-auto lg:mx-0 drop-shadow-2xl'>
      <div className='mt-16 mx-4 flex flex-col align-middle justify-center text-center '>
       
          {name == "Design" &&
            <div className='bg-purple-400 w-fit mx-auto p-4 rounded-full'>
              <GiPencilBrush className='inline mx-auto text-2xl'/>
            </div>
          }
          {name == "Develop" &&
            <div className='bg-emerald-400 w-fit mx-auto p-4 rounded-full'>
            <FaLaptopCode className='inline mx-auto text-2xl'/>
            </div>
          }
          {name == "Optimize" &&
            <div className='bg-rose-400 w-fit mx-auto p-4 rounded-full'>
            <IoIosSpeedometer className='inline mx-auto text-2xl'/>
            </div>
          }
          {name == "Deploy" &&
            <div className='bg-blue-400 w-fit mx-auto p-4 rounded-full'>
            <BiWorld className='inline mx-auto text-2xl'/>
            </div>
          }
         <h1 className='font-semibold text-2xl'>{name} &nbsp;</h1>
          {name == "Design" &&
            <p className='my-auto'>Our design team will create a stunning design for your site. With as many revisions as it takes, we are not satisfied until you are.</p>
          } 
          {name == "Develop" &&
            <p className='my-auto'>Once we have a beautiful design completed for your site, our development team will bring it to life as a living, breathing, application.</p>
          }
          {name == "Optimize" &&
            <p className='my-auto'>During this phase, we make sure your website is search engine friendly. Our SEO experts will make sure your site is the first thing users see when searching for your niche.</p>
          } 
          {name == "Deploy" &&
            <p className='my-auto'>Only once you are completely satisfied with your site, will it be deployed and made available for the world to see.</p>
          }
      </div>
    </div>
  )
}

export default Service