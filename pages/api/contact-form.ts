import type { NextApiRequest, NextApiResponse } from 'next'
const nodemailer = require("nodemailer");

type Data = {
  success: boolean
}


const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    secure:true,
    port:465,
    auth: {
        user:'wwalker@evolveweb.io',
        pass:'Sey3qT6Jug4W',
    },
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === "POST"){
     console.log(req.body)
     
     transporter.sendMail({
      from: 'contact@getorderup.com',
      to: 'contact@getorderup.com',
      subject: 'Contact Form',
      text: `
        Name: ${req.body.fname} ${req.body.lname}, 
        Country: ${req.body.country}, 
        Company: ${req.body.cname}, 
        Email: ${req.body.email}, 
        Phone: ${req.body.phone}, 
        Message: ${req.body.message}, 
        Preferred Contact Method: ${req.body.preferredContact}`
     }, (err:any, info:any) => {
      if(err){
        console.log(err);
      }else{
        console.log('Sent', info.response)
        res.status(200).json({success:true})
      }
})
  }
}