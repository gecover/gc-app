'use client';
import { Card, Grid, TextField, Button,  Typography } from '@mui/material';
import {FormControl, FormLabel, Input, FormHelperText } from '@mui/joy'
import FileDrop from '../../components/ui/FileDrop';
import PDFDocument from '../../components/ui/PDF/PDFDocument';
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar,  { SnackbarProps }  from '@mui/joy/Snackbar';
import 'styles/gecover.css';
import Link from 'next/link';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Session } from '@supabase/supabase-js';

interface Props {
  session: Session;
  userName: string;
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

export default function InputForm({ session, userName }: Props) {
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
  const [fileIcon, setFileIcon] = useState('X'); // 'X' or 'check'
  const [urlIcon, setUrlIcon] = useState('X'); 
  
  const [paragraphB, setParagraphB] = useState<string>('');
  const label_style = {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: 'red'

  }
  
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
          setBanner(`You loaded a pdf with ${length} chunks.`);
          setFileIcon('check');
        } else {
          setResumeData(resumeList.data);
          setOpen(true);
          setColor('danger');
          setBanner(`You loaded a pdf with ${length} chunks. Parsing did not work well, and you likely will not get good results.`);
          setFileIcon('X');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } 
    }
  };

  const handleDownload = () => {
    const blob = new Blob([paragraph], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    // Step 3: Create a download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gecover-demo.txt';

    // Append link to the body
    document.body.appendChild(link);

    // Step 4: Trigger the download
    link.click();

    // Clean up and remove the link
  }

  const handleUrlChange = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log('URL RECEIVED', url);

    const linkedInJobRegex = /^https:\/\/www\.linkedin\.com\/jobs\/view\/.*$/;
    console.log('URL;', event.target.value)
    console.log('TEST RGEX', linkedInJobRegex.test(event.target.value))
    if (linkedInJobRegex.test(event.target.value)) {
      setUrl(event.target.value);
      setOpen(true);
      setColor('success');
      setBanner(`URL format valid.`);
      setUrlIcon('check');
    } else {
      setUrlIcon('X');
      setOpen(true);
      setColor('danger');
      setBanner(`It appears the URL provided has an invalid format. We support linked post of the form https://www.linkedin.com/jobs/view/***********.`);
    }
  };

  const handleSubmit = async () => {
    const TIMEOUT_DURATION = 60000;
    setIsLoading(true);

    let urlList = null;
    if ((urlIcon == 'check')) {
      try {
        urlList = await axios.post(`${process.env.API_URL}/extract_url/`, 
          { url },
          {headers: {
            'Authorization' : `Bearer ${session.access_token}`
        }});
  
        if (!urlList.data.contents) {
          setOpen(true);
          setColor('danger');
          setBanner(`We didn't get your job requirements. Please note we only support LinkedIn from the direct job page currently.`);
          setUrlIcon('X');
        } else {
          setOpen(true);
          setColor('success');
          setBanner(`Successfully loaded ${urlList.data.contents.length} job requirements.`);
          setUrlIcon('check');
        }

        if (resumeData) {
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
    } 
  };

  return (
    <>
    {isLoading && <LoadingOverlay />}
    
    <section className="bg-black">
      <Snackbar color={color} open={open} autoHideDuration={1000} > {banner} </Snackbar>

        <div className="max-w-6xl py-8 px-4 mx-auto sm:py-16 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col sm:align-center">

                <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                    Generate Tailored Cover Letters
                </h1>
                <h1 className="text-lg pt-4 font-extrabold text-white sm:text-center sm:text-xl">
                    If you're new, check out our 
                </h1>
                <Link className="font-black text-pink-500 text-xl text-center" href="/how-to"> first time user instructions </Link>

                <div className="mt-8">
                    <div className="border-2 border-pink-500 border-opacity-70 rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900 p-6">
                        <div className="space-y-6">
                            <FileDrop handleFileChange={handleFileChange} icon={fileIcon}/>
                          
                            <TextField 
                                fullWidth 
                                label="Enter Job Posting URL" 
                                variant="outlined" 
                                className="no-outline"
                                onChange={handleUrlChange}
                                multiline={true}

                                autoComplete='off'

                                sx={{
                                  color: 'white',
                                  opacity: 1,
                                  boxShadow: 0,
                                 

                                  '& .MuiInputBase-root': {
                                    color: 'white',
                                  },
                                  "& input": {
                                    color: 'white',
                                  },
                                  "& .MuiFormLabel-root": {
                                    color: 'white',
                                  },
                                  
                                  '& label.Mui-focused': {
                                    color: 'white', 
                                    
                                  },
                                  '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: 'white',
                                      padding: -0.5, 
                                      color: 'white',
                                    },
                                    '&:hover fieldset': {
                                      borderColor: 'white', 
                                      color: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: 'white', 
                                      color: 'white',
                                    }
                                  }
                                }}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      {urlIcon === 'check' ? <CheckIcon style={{ color: 'green' }} /> : <CloseIcon style={{ color: 'white' }} />}
                                    </InputAdornment>
                                  ),
                                }}
                                
                            />
                            <div className="flex justify-center">
                                <Button 
                                    variant="contained" 
                                    onClick={handleSubmit}
                                    style={{
                                      backgroundColor: fileIcon !== 'check' || urlIcon !== 'check' ? '#b0b0b0' : '#ec4899',
                                      color: fileIcon !== 'check' || urlIcon !== 'check' ? 'white' : 'white', 
                                      cursor: fileIcon !== 'check' || urlIcon !== 'check' ? 'not-allowed' : 'pointer'
                                    }}
                                    disabled={fileIcon !== 'check' || urlIcon !== 'check'}
                                >
                                    Generate
                                </Button>
                            </div>
                            
                            {paragraph && (<Box>
                              <PDFDownloadLink
                                document={
                                  <PDFDocument 
                                   userName={userName}
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
                                <Button onClick={handleDownload}>
                                Download txt
                                </Button>
                            </Box>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </section>
    </>
  );
}