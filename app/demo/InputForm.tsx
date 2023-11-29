'use client';
import {TextField} from '@mui/material';
import FileDrop from '../../components/ui/FileDrop';
import Editor from '../../components/ui/Editor';
import Button from '@mui/joy/Button';

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
import Checkbox from '@mui/joy/Checkbox';
import Card from '@mui/joy/Card';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';
import { Grid, Stack } from '@mui/joy';


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

const steps = ['Upload Resume', 'Paste URL', 'Generate'];


export default function InputForm({ session, userName }: Props) {
  const [fileData, setFile] = useState<File>();
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [paragraph, setParagraph] = useState<string>('');
  const [jobName, setJobName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState<SnackbarProps['color']>('primary');
  const [banner, setBanner] = React.useState('');
  const [resumeData, setResumeData] = useState<string[]>([]);
  const [urlData, setUrlData] = useState<string[]>([]);
  const [fileIcon, setFileIcon] = useState('X'); // 'X' or 'check'
  const [urlIcon, setUrlIcon] = useState('X'); 
  const [model, setModel] = useState('normal'); 
  const [activeStep, setActiveStep] = React.useState(0);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);


  const [paragraphB, setParagraphB] = useState<string>('');
  const label_style = {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: 'red'
  }
  
  const handleAltmanChange = (event: ChangeEvent<HTMLInputElement>) => {
    setModel(event.target.checked ? 'altman' : 'normal');
  };
  
  const handleRetry = () => {
    setResumeData([])
    setFileIcon('X')
  }

  const handleFileChange = (file: File) => {
    setFile(file);
    setFileIcon('check');
    setActiveStep(activeStep + 1);
    setOpen(true);
    setColor('success');
    setBanner(`Successfully loaded your resume.`);
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

  const handleURLSubmit = async () => {
    setButtonLoading(true);
    try {
      const urlList = await axios.post(`${process.env.API_URL}/extract_url/`, 
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
        setUrlData(urlList.data.contents);
        setJobName(urlList.data.job_title.trim());
        setCompanyName(urlList.data.company.trim());
        setUrlIcon('check');
      }
    } 
    catch (e) {
      console.error(e);
    }
    setButtonLoading(false);
  }

  const handleSubmit = async () => {
    const TIMEOUT_DURATION = 150000; 

    const formData = new FormData();
    if (fileData){
      formData.append('file', fileData);
      formData.append('type', 'application/pdf');
    }
    setIsLoading(true);

    let urlList = null;
    if ((urlIcon == 'check')) {
      try {
        if (urlData.length == 0) {
          setOpen(true);
          setColor('danger');
          setBanner(`We didn't get your job requirements. Please head to step 2.`);
          setUrlIcon('X');
          throw new Error("no job requirements");
        } 
        
        const CancelToken = axios.CancelToken;
        // const source = CancelToken.source();
        const requirements = urlData.toString();
        const generatedParagraphs = await axios.post(`${process.env.API_URL}/generate_paragraphs/`, formData, {
            // cancelToken: source.token,
            timeout: TIMEOUT_DURATION,
            headers: {
              'Authorization' : `Bearer ${session.access_token}`
            },
            params: { requirements }
        });
        console.log("waiting for pdf...")
        // source.cancel('Request was cancelled by the user.');
        console.log(generatedParagraphs.data.para_A);
        setParagraph(generatedParagraphs.data.para_A);
      } catch (error) {
        console.error('Error fetching URL:', error);
      } finally {
        setIsLoading(false);
    }
    } 
  };

  return (
    <>
    {isLoading && <LoadingOverlay />}
    <section className="bg-sky-950">
      <Snackbar color={color} open={open} autoHideDuration={1000} > {banner} </Snackbar>
        <div className="max-w-6xl py-8 px-4 mx-auto sm:py-16 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col sm:align-center">
                <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                    Generate Tailored Cover Letters
                </h1>
                <h1 className="text-lg pt-4 font-extrabold text-white sm:text-center sm:text-xl">
                    For a smooth start, please take a moment to explore our <Link className="font-black text-pink-500 text-xl text-center" href="/tutorial">helpful guide for first-time users. </Link>
                </h1>

                <Card className="mt-4 bg-white w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-2/3 2xl:w-2/3 flex justify-center items-center self-center">
                  <Stepper sx={{ width: '100%' }}>
                  {steps.map((step, index) => (
                      <Step
                        key={step}
                        indicator={
                          <StepIndicator
                            variant={activeStep <= index ? 'soft' : 'solid'}
                            color={activeStep < index ? 'neutral' : 'primary'}
                          >
                            {activeStep <= index ? index + 1 : <Check />}
                          </StepIndicator>
                        }
                        sx={{
                          '&::after': {
                            ...(activeStep > index &&
                              index !== 2 && { bgcolor: 'primary.solidBg' }),
                          },
                        }}
                      >
                        <StepButton onClick={() => setActiveStep(index)}>{step}</StepButton>
                      </Step>
                    ))}
                  </Stepper>
                </Card>
                {activeStep == 4 && 
                <Card className="mt-4 bg-white w-full flex flex-row items-center">
                  <FileDrop handleFileChange={handleFileChange} icon={fileIcon}/>
                  <Editor chunks={resumeData} setChunks={setResumeData} />
                  <Button onClick={() => setActiveStep(activeStep + 1)}> Next </Button>
                  {/* <Button  sx={{ marginTop: 'auto', alignSelf: 'flex-end'}} onClick={() =>console.log(resumeData)}> Test </Button> */}
                </Card>
                }
                {activeStep == 0 && resumeData.length == 0 &&

                  <Card className="sm:md:lg:w-1/2 mt-4 xl:2xl:w-1/2 items-center self-center justify-self-center justify-center">
                    <FileDrop handleFileChange={handleFileChange} icon={fileIcon}/>
                  </Card>
                               
                }
                {activeStep == 0 && resumeData.length > 0 &&
                <Grid container spacing={2} sx={{ flexGrow: 1, marginTop: 4 }}>
                  <Grid xs={2}>
                  </Grid>

                  <Grid xs={8}>
                   <Editor chunks={resumeData} setChunks={setResumeData} />
                  </Grid>
                  <Grid sx={{ justifySelf: 'center', alignSelf: 'center'}} xs={2}>
                    <Card>
                      <Button color='neutral' size='lg' variant='soft' onClick={handleRetry}> Retry PDF </Button>
                     <Button color='primary' size='lg' variant='plain' onClick={() => setActiveStep(activeStep + 1)}> Done </Button>
                    </Card>
                   </Grid>
              </Grid>
                }
                
                {activeStep == 1 && urlData.length == 0 &&
                <Card className="justify-center self-center mt-4 bg-white sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-2/3 2xl:w-2/3 flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center">
                  <TextField 
                      label="Enter Job Posting URL" 
                      variant="outlined" 
                      className="no-outline"
                      onChange={handleUrlChange}
                      autoComplete='off'

                      sx={{
                        color: 'black',
                        opacity: 1,
                        boxShadow: 0,
                        width: '80%',

                        '& .MuiInputBase-root': {
                          color: 'black',
                        },
                        "& input": {
                          color: 'black',
                        },
                        "& .MuiFormLabel-root": {
                          color: 'black',
                        },
                        
                        '& label.Mui-focused': {
                          color: 'black', 
                          
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'black',
                            padding: -0.5, 
                            color: 'black',
                          },
                          '&:hover fieldset': {
                            borderColor: 'black', 
                            color: 'black',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'black', 
                            color: 'black',
                          }
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {urlIcon === 'check' ? <CheckIcon style={{ color: 'green' }} /> : <CloseIcon style={{ color: 'black' }} />}
                          </InputAdornment>
                        ),
                      }}     
                    />

                  
                  <Button sx={{alignSelf: 'flex-center', justifySelf: 'flex-end'}}                                   
                      style={{
                        backgroundColor: urlIcon !== 'check' ? '#b0b0b0' : '#ec4899',
                        color: urlIcon !== 'check' ? 'white' : 'white', 
                        cursor: urlIcon !== 'check' ? 'not-allowed' : 'pointer'
                      }}
                      disabled={urlIcon !== 'check'} 
                      loading={buttonLoading}
                      onClick={handleURLSubmit}> 
                      Submit 
                  </Button>
                  
                  
                  
                  <Button sx={{alignSelf: 'flex-center', justifySelf: 'flex-end'}}                                   
                          style={{
                            backgroundColor: '#385E72',
                            color: 'white', 
                            cursor: urlIcon !== 'check' ? 'not-allowed' : 'pointer'
                          }}
                          disabled
                          onClick={() => setActiveStep(activeStep + 1)}> 
                          Next 
                  </Button>
                </Card>
                }

              {activeStep == 1 && urlData.length > 0 &&
              <Stack direction='column'>
                <Card  sx={{ justifySelf: 'center', alignSelf: 'center', marginTop: '4rem', backgroundColor: 'whitesmoke', width: '80%',  display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
                                    <TextField 
                      label="Enter Job Posting URL" 
                      variant="outlined" 
                      className="no-outline"
                      onChange={handleUrlChange}
                      autoComplete='off'

                      sx={{
                        color: 'black',
                        opacity: 1,
                        boxShadow: 0,
                        width: '80%',

                        '& .MuiInputBase-root': {
                          color: 'black',
                        },
                        "& input": {
                          color: 'black',
                        },
                        "& .MuiFormLabel-root": {
                          color: 'black',
                        },
                        
                        '& label.Mui-focused': {
                          color: 'black', 
                          
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'black',
                            padding: -0.5, 
                            color: 'black',
                          },
                          '&:hover fieldset': {
                            borderColor: 'black', 
                            color: 'black',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'black', 
                            color: 'black',
                          }
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {urlIcon === 'check' ? <CheckIcon style={{ color: 'green' }} /> : <CloseIcon style={{ color: 'black' }} />}
                          </InputAdornment>
                        ),
                      }}     
                    />
                  <Button sx={{alignSelf: 'flex-center', justifySelf: 'flex-end'}}                                   
                          style={{
                            backgroundColor: urlIcon !== 'check' ? '#b0b0b0' : '#ec4899',
                            color: urlIcon !== 'check' ? 'white' : 'white', 
                            cursor: urlIcon !== 'check' ? 'not-allowed' : 'pointer'
                          }}
                          disabled={urlIcon !== 'check'} 
                          onClick={handleURLSubmit}> 
                          Submit 
                  </Button>
                  <Button sx={{alignSelf: 'flex-center', justifySelf: 'flex-end'}}                                   
                          style={{
                            backgroundColor: '#6AABD2',
                            color: 'white', 
                            cursor: urlIcon !== 'check' ? 'not-allowed' : 'pointer'
                          }}
                          onClick={() => setActiveStep(activeStep + 1)}> 
                          Next 
                  </Button>
                </Card>
                <Box sx={{marginTop: 4, width: '80%', justifySelf: 'center', alignSelf: 'center'}}>
                  <Editor chunks={urlData} setChunks={setUrlData}/>
                </Box>
                </Stack>
                }

                {activeStep == 2 && 
                  <div className="mt-8">
                    <div className="rounded-lg shadow-sm divide-y p-6">
                        <div className="space-y-6">
                            {/* <div className="flex justify-center sm:justify-end ">
                                <Checkbox
                                  color="neutral"
                                  label="Altman Mode"
                                  size="lg"
                                  variant="outlined"
                                  checked={model === 'altman' ? true : false}
                                  onChange={handleAltmanChange} 
                                  style={{
                                    color: 'white',
                                    alignSelf:'center',
                                    justifySelf: 'center',
                                  }}
                                />
                              </div> */}
                              <div className="flex justify-center">
                                <Button 
                                    size="lg"
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
                              
                              
                              {paragraph && (
                                <Box display="flex" justifyContent="center" alignItems="center">
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
                                        {({ blob, url, loading, error }) => (
                                            <Button 
                                              size='lg'

                                                color="primary"
                                                sx={{ 
                                                  backgroundColor: '#f472b6', 
                                                  color: 'white',
                                                  '&:hover': {
                                                      backgroundColor: '#EC4899',
                                                  },
                                                }}
                                                style={{ marginRight: '10px' }}
                                                disabled={loading}
                                            >
                                                {loading ? 'Loading document...' : 'Download PDF'}
                                            </Button>
                                        )}
                                    </PDFDownloadLink>
                                    <Button 
                                      size='lg'
                                        sx={{                                         
                                          backgroundColor: '#57534E',
                                          '&:hover': {
                                          backgroundColor: '#EC4899',
                                      }, 
                                      }}
                                        onClick={handleDownload}
                                    >
                                        Download txt
                                    </Button>
                                </Box>
                            )}
                            </div>
                        </div>
                    </div>
              }
            </div>
        </div>
    </section>
    </>
  );
}