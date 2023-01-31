import React, {useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../components/navbar';

type formResType = {
  success: boolean
}


function Contact() {
  const [formState, setFormState] = useState({
    fname:'',
    lname: '',
    cname:'',
    country:'',
    email:'',
    phone:'',
    preferredContact:'',
    message:''
  })
  
  const [formRes, setFormRes] = useState<formResType|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e:any, value:any) => {
    let current:any = formState;
    current[value] = e.target.value;
    setFormState(current);
    console.log(formState);
  }
  async function handleSubmit(e:any) {
    e.preventDefault();
    setLoading(true)
    const response = await fetch("/api/form", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formState)
    });
    const json = await response.json();
    setLoading(false)
    setFormRes(json)
  }
  return (
    <>
    <section className='min-h-[100vh] bg-[#E8E8E8]  flex justify-center'>
      <div className="flex flex-col mt-[70px] md:my-auto md:w-[750px] lg:w-[1000px] xl:w-[1200px] gap-2">
        <div className=' bg-[#323732] w-full h-fit my-auto'>
          <form id="#form" className='flex flex-col m-12 gap-4 text-black' onSubmit={handleSubmit}>
            {loading &&
            <div className='h-[391px] flex'>
              <div className='flex my-auto mx-auto'>
                <CircularProgress className=''/>
              </div>
            </div>
           
            }
            {formRes && formRes.success == true && 
            <div className='h-[391px] flex text-center md:text-left text-white'>
             <div className='flex-col my-auto'>
                <h1 className='mx-auto md:ml-0 w-fit font-bold text-5xl mb-2'>Order Up!</h1>
                <h2 className='my-auto mx-auto w-fit font-bold relative mb-2'>
                We have received your submission. We will reach out to you within 24 hours via your preferred contact method. We look forward to working with you.
              </h2>
              <button type="button" className='py-2 px-4 bg-[#97BBAF] rounded-sm font-bold text-white' onClick={() =>setFormRes(null)}>Submit another message</button>
              </div>
            </div>
          }
          {formRes == null && !loading &&
          <>
            <h1 className='font-bold text-3xl text-white'>Questions? We&apos;ve got answers</h1>
            <div className='flex flex-col lg:flex-row gap-4'>
              <input type="text" id="fname" onChange={(e)=>handleChange(e,"fname")} name="fname" placeholder=" First Name" className="lg:w-1/3 h-10 rounded-sm"/>
              <input type="text" id="lname" onChange={(e)=>handleChange(e,"lname")} name="lname" placeholder=" Last Name" className="lg:w-1/3 h-10 rounded-sm"/>
              <input type="text" id="country" onChange={(e)=>handleChange(e,"country")} name="country" placeholder=" Country" className="lg:w-1/3 h-10 rounded-sm"/>
            </div>
            <div className='flex flex-col lg:flex-row gap-4'>
              <input type="text" id="cname" onChange={(e)=>handleChange(e,"cname")} name="cname" placeholder=" Company Name" className="lg:w-1/3  h-10 rounded-sm"/>
              <input type="text" id="email" onChange={(e)=>handleChange(e,"email")} name="email" placeholder=" Email" className="lg:w-1/3 h-10 rounded-sm"/>
              <input type="text" id="phone" onChange={(e)=>handleChange(e,"phone")} name="phone" placeholder=" Phone" className="lg:w-1/3 h-10 rounded-sm"/>
            </div>
            
            <textarea style={{color:"black !important"}} rows={6} cols={3} id="message" onChange={(e)=>handleChange(e,"message")} name="message" className='rounded-sm p-2' placeholder="Message" />
            <div className='flex flex-col sm:flex-row text-white'>
              Preferred Contact Method:&nbsp;
              <div className='flex'>
                <input type="radio" id="via_email" onChange={(e)=>handleChange(e,"preferredContact")} value="email" name="fav_contact" />
                <label htmlFor="via_email" className='mx-1'>Email</label>

                <input type="radio" id="via_phone" onChange={(e)=>handleChange(e,"preferredContact")} value="phone" name="fav_contact" />
                <label htmlFor="via_phone" className='mx-1'>Phone</label>
              </div>
             
            </div>
            <button  type="submit" className='py-2 px-4 bg-[#97BBAF] lg:w-44 text-white font-bold rounded-sm'>Submit</button>
            </>
          }

          </form>
          <div id="form" className='w-full bg-transparent'></div>
          </div>
        </div>
      </section>  </>
  )
}

export default Contact