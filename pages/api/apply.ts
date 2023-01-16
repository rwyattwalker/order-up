import type { NextApiRequest, NextApiResponse } from "next";
import { parseForm, FormidableError } from "../../lib/parse-form";
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
      user:'fullstaksolutions@outlook.com',
      pass:'%M:RtYMJ8dxQL(+',
  },
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: {
      url: string | string[];
    } | null;
    error: string | null;
  }>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }
  // Just after the "Method Not Allowed" code
  try {
    const { fields, files } = await parseForm(req);
    console.log(fields, "fields")
    console.log(files, "THE FILES")
    const file = files.media;
    // console.log(file, "files(s)")
    let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;
    let attachments = Array.isArray(file) ? [] : [{path: file.filepath}]
    Array.isArray(file) && file.map((e, i)=>{
      attachments.push({path: e.filepath})
    })
    await transporter.sendMail({
      from: 'fullstaksolutions@outlook.com',
      to: 'rwyattwalker@gmail.com',
      subject: 'Resume',
      text: `
        Name: ${fields.name}, 
        Email: ${fields.email},
        Cover Letter: ${fields.coverLetter}
      `,
      attachments: attachments
    })
    res.status(200).json({
      data: {
        url,
      },
      error: null,
    });
  } catch (e) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ data: null, error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ data: null, error: "Internal Server Error" });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;