'use client';
import { Card, Grid, TextField, Button, Typography } from '@mui/material';
import FileDrop from '../../components/ui/FileDrop';
import PDFDocument from '../../components/ui/PDF/PDFDocument';
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

import { PDFDownloadLink } from '@react-pdf/renderer';

import { Session } from '@supabase/supabase-js';

interface Props {
  session: Session;
}

const LoadingOverlay = () => (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="text-white">Loading...</div>
      {/* TODO - Replace the above with a spinner or loading animation */}
    </div>
);
  

export default function InputForm({ session }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  const [educationParagraph, setEducationParagraph] = useState<string>('');
  const [experienceParagraph, setExperienceParagraph] = useState<string>('');


//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       //setFile(event.target.files[0]);
//       console.log('FILE RECEIVED');
//     }
//   };
  const handleFileChange = (file: File) => {
    setFile(file);
    console.log('FILE RECEIVED', file);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async () => {

    const TIMEOUT_DURATION = 200000;
    setIsLoading(true);

    let resumeList = null;
    let urlList = null;
  
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'application/pdf');

      try {
        resumeList = await axios.post('http://localhost:5000/read_pdf/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(resumeList.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      } 
    }

    if (url) {
      try {
        urlList = await axios.post('http://localhost:5000/extract_url/', { url });
        console.log(urlList.data);
      } catch (error) {
        console.error('Error fetching URL:', error);
      }
    }
    
    if (resumeList && resumeList.data.contents && urlList && urlList.data.contents) {
        try {
            // Create a cancel token source
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            const generatedParagraphs = await axios.post('http://localhost:5000/generate_paragraphs/', {
            requirements: urlList.data.contents,
            resume_documents: resumeList.data.contents, 
            }, {
                cancelToken: source.token,
                timeout: TIMEOUT_DURATION 
            });
            // TODO - FIX CANCEL TOKEN
            source.cancel('Request was cancelled by the user.');
            console.log(generatedParagraphs.data);
            //console.log('FIORST PARA', generatedParagraphs.data.para_A)
            //console.log('SECOND PARA', generatedParagraphs.data.second_para[1])
            //setEducationParagraph(generatedParagraphs.data.para_A);
            setExperienceParagraph(generatedParagraphs.data.para_A);
        } catch (error) {
            console.error('Error generating paragraphs:', error);
        } finally {
            setIsLoading(false);
        }
      } else {
        console.log('Either resume list or URL list or both are not available.');
        setIsLoading(false);
      }
  };

  return (
    <>
    {isLoading && <LoadingOverlay />}
    <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col sm:align-center">
                <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                    Generate Tailored Cover Letters
                </h1>
                <div className="mt-12">
                    <div className="border border-pink-500 border-opacity-50 rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900 p-6">
                        <div className="space-y-6">
                            <FileDrop handleFileChange={handleFileChange} />
                                <TextField 
                                    fullWidth 
                                    label="Enter Job Posting URL" 
                                    variant="outlined" 
                                    onChange={handleUrlChange}
                                    className="text-white bg-zinc-800"
                                    InputLabelProps={{
                                        className: "text-white",
                                        classes: { focused: "text-white" }
                                    }}
                                    InputProps={{
                                        className: "text-white",
                                        classes: { notchedOutline: "border-white" }
                                    }}
                                    sx={{
                                        '& label.Mui-focused': {
                                          color: 'white', 
                                        },
                                        '& .MuiOutlinedInput-root': {
                                          '& fieldset': {
                                            borderColor: 'white', 
                                          },
                                          '&:hover fieldset': {
                                            borderColor: 'white', 
                                          },
                                          '&.Mui-focused fieldset': {
                                            borderColor: 'white', 
                                          },
                                        },
                                    }}
                                />
                            <div className="flex justify-center">
                                <Button 
                                    variant="contained" 
                                    onClick={handleSubmit}
                                    className="bg-pink-500 hover:bg-pink-600 text-white"
                                >
                                    Generate
                                </Button>
                            </div>
                            <div>
                            {experienceParagraph && (
                              <PDFDownloadLink
                                document={
                                  <PDFDocument 
                                  position={"null"}
                                  companyName={"null"}
                                  educationParagraph={"null"}
                                    experienceParagraph={experienceParagraph} 
                                  />
                                }
                                fileName="your-gecover.pdf"
                              >
                                {({ blob, url, loading, error }) =>
                                  loading ? 'Loading document...' : 'Download PDF'
                                }
                              </PDFDownloadLink>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  );
}