import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable';

type Data = {
  success: boolean
}


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ){
    // parse a file upload
    var form = new formidable.IncomingForm();
    console.log(form, "this is the form")
    form.parse(req, function (err, fields, files) {
      res.write('File uploaded');
      res.end();
  })
}