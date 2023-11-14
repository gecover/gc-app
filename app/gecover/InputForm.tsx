'use client';
import { Card, Grid, TextField, Button, Typography } from '@mui/material';
import FileDrop from '../../components/ui/FileDrop';
import PDFDocument from '../../components/ui/PDF/PDFDocument';
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar,  { SnackbarProps }  from '@mui/joy/Snackbar';


import { PDFDownloadLink } from '@react-pdf/renderer';

import { Session } from '@supabase/supabase-js';

interface Props {
  session: Session;
}

const LoadingOverlay = () => (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{color: "pink"}}/>
      </Box>
    </div>
);

type ResponseContent = {
  contents: string[];
};

export default function InputForm({ session }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  const [paragraph, setParagraph] = useState<string>('');
  const [jobName, setJobName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState<SnackbarProps['color']>('primary');
  const [banner, setBanner] = React.useState('');

  const [resumeData, setResumeData] = useState<ResponseContent>({ contents: [] });
  const [urlData, setUrlData] = useState<ResponseContent>({ contents: [] });

  
  const [paragraphB, setParagraphB] = useState<string>('');

  
  const handleFileChange = async (file: File) => {
    setFile(file);
    console.log('FILE RECEIVED', file);
    let resumeList = null;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'application/pdf');

      try {
        resumeList = await axios.post(`${process.env.API_URL}/read_pdf/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization' : `Bearer ${session.access_token}`
          },
        });
        const length = resumeList.data.contents.length;
        if (length > 5){
          setResumeData(resumeList.data);
          setOpen(true);
          setColor('success');
          setBanner(`You loaded a pdf with ${length} chunks.`)
        } else {
          setResumeData(resumeList.data);
          setOpen(true);
          setColor('danger');
          setBanner(`You loaded a pdf with ${length} chunks. Parsing did not work well, and you likely will not get good results.`)
        }
        
        // console.log(resumeList.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      } 
    }
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
    console.log('URL RECIVED', url);
  };

  const handleSubmit = async () => {

    const TIMEOUT_DURATION = 200000;
    setIsLoading(true);

    let urlList = null;

    try {
      urlList = await axios.post(`${process.env.API_URL}/extract_url/`, 
        { url },
        {headers: {
        'Authorization' : `Bearer ${session.access_token}`
      }});

      if (!urlList.data.contents) {
        setOpen(true);
        setColor('danger');
        setBanner(`We didn't get your job requirements. Please note we only support LinkedIn from the direct job page currently.`)
      } else {
        setOpen(true);
        setColor('success');
        setBanner(`Successfully loaded ${urlList.data.contents.length} job requirements.`)
      }

       if (resumeData && urlData) {
        try {
            // Create a cancel token source
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            const generatedParagraphs = await axios.post(`${process.env.API_URL}/generate_paragraphs/`, {
            requirements: urlList.data.contents,
            resume_documents: resumeData.contents, 
            }, {
                cancelToken: source.token,
                timeout: TIMEOUT_DURATION,
                headers: {
                  'Authorization' : `Bearer ${session.access_token}`
                }
            });
            // TODO - FIX CANCEL TOKEN
            source.cancel('Request was cancelled by the user.');
            console.log(generatedParagraphs.data);
            // console.log('FIORST PARA', generatedParagraphs.data.first_para)
            // console.log('SECOND PARA', generatedParagraphs.data.second_para)
            setParagraph(generatedParagraphs.data.para_A);
        } catch (error) {
            console.error('Error generating paragraphs:', error);
        } finally {
            setIsLoading(false);
        }
      } else {
        console.log('Either resume list or URL list or both are not available.');
        setIsLoading(false);
        // TODO - IMPLEMENT ERROR HANDLING THROUGH WARNING COMPONENT PROVIDING INFO: RESUME INSUFFICIENT? URL UNPROCESSABLE?
      }


      setUrlData(urlList.data);
      setJobName(urlList.data.job_title.trim());
      setCompanyName(urlList.data.company.trim());
    } catch (error) {
      console.error('Error fetching URL:', error);
    }
  };

  return (
    <>
    {isLoading && <LoadingOverlay />}
    <section className="bg-black">
      <Snackbar color={color} open={open} autoHideDuration={1000} > {banner} </Snackbar>

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
                            {paragraph && (
                              <Box>
                              <PDFDownloadLink
                                document={
                                  <PDFDocument 
                                    bodyParagraph={paragraph}
                                    jobTitle={jobName}
                                    companyName={companyName}
                                  />
                                }
                                fileName="your-gecover.pdf"
                              >
                                {({ blob, url, loading, error }) =>
                                  loading ? 'Loading document...' : 'Download PDF'
                                }
                              </PDFDownloadLink>
                              </Box>

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