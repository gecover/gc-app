// pages/api/submit-cover-letter.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    
    const { file, url } = req.body;

    // Handle file upload or URL extraction logic here

    // For example, if a file is uploaded:
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'application/pdf');
  
        try {
          const response = await axios.post('http://localhost:5000/read_pdf/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
    }

    // If a URL is provided:
    if (url) {
        try {
            const response = await axios.post('http://localhost:5000/extract_url/', { url });
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching URL:', error);
          }
    }

    // Respond with a success message or any content you need to return
    res.status(200).json({ message: 'Cover letter generated successfully.' });
  } else {
    // If not a POST request, indicate the allowed method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}