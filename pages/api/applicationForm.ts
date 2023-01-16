import type { NextApiRequest, NextApiResponse } from 'next'
const formidable = require('formidable');
const nodemailer = require("nodemailer");
const fs = require('fs');

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
    const form = formidable({multiples:true});
    form.parse(req, (err:any, fields:any, files:any) => {
      if (err) {
        res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
        res.end(String(err));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ fields, files }, null, 2));
    });
    return;
  }
}
