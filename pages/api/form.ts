import type { NextApiRequest, NextApiResponse } from 'next'
const nodemailer = require("nodemailer");

type Data = {
  success: boolean
}

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user:'fullstaksolutions@outlook.com',
        pass:'%M:RtYMJ8dxQL(+',
    },
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === "POST"){
     console.log(req.body)
     
     transporter.sendMail({
      from: 'fullstaksolutions@outlook.com',
      to: 'rwyattwalker@gmail.com',
      subject: 'Main Form',
      text: `
        Name: ${req.body.fname} ${req.body.lname}, 
        Country: ${req.body.country}, 
        Company: ${req.body.cname}, 
        Email: ${req.body.email}, 
        Phone: ${req.body.phone}, 
        Message: ${req.body.message}, 
        Preferred Contact Method: ${req.body.fav_contact}`
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
