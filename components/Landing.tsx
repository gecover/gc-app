"use client"

import React from 'react';
import Link from 'next/link';
import { Card, Stack, Typography } from '@mui/joy';
import Typed from 'typed.js';
import Image from 'next/image';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function Landing() {
  const el = React.useRef(null);
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [`Good day, <br>
      I am applying for the Platform - Golang Software Developer (Ingest Team) position at Elastic.
      Based on the extensive experience outlined in the CV, I am confident that I possess the robust Golang
      expertise needed for large-scale projects. With hands-on, full-stack development using Kubernetes,
      Docker, and related technologies for my endeavors, such as the versatile GeCover Cover Letter Writer
      and other personal projects, I have garnered over three years of applied experience working in SaaS
      environments.`, `To the Hiring Manager, <br>
      I am writing to express my interest in the Machine Learning Engineering position at TikTok. Your company's commitment to enhancing the user experience
      through innovative recommendation systems is truly commendable, and I am enthusiastic about the opportunity to contribute to such impactful work.
      During my tenure at Global Predictions Inc, I conducted impactful data analysis of macroeconomic relationships, thus contributing to the creation of the
      second iteration of Global Prediction's Knowledge Graph. Through `,
      `this experience, I honed my skills in Python while algorithmically creating over 10k
      relationships for the knowledge graph. This accomplishment not only sharpened my expertise in data analysis but also strengthened my ability to derive
      valuable insights from complex data sets, demonstrating my proficiency in machine learning and data mining techniques.
      `, `I am deeply passionate about learning new techniques and addressing challenging problems, which aligns perfectly with the ethos of the Machine Learning
      Engineering position at TikTok. My technical activities, especially my full-stack development contributions to gecover.com, reflect this passion and my ability
      to deploy cutting-edge technologies to address real-world challenges.
     `,
       `I am eager to bring my expertise in machine learning, data mining, and my strong programming skills in Python to TikTok to optimize and fine-tune your
      industry-leading recommendation system. I am prepared to collaborate with cross-functional teams, conduct rigorous A/B tests, and work towards
      enhancing the efficiency and stability of machine learning systems.
      I am looking forward to the opportunity to discuss how my background, skills, and enthusiasm make me a perfect fit for the Machine Learning Engineering
      position at TikTok.`],
      typeSpeed: 15,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

    return (
        <div className="min-h-screen">
          <Stack className="flex flex-col items-center sm:flex-row md:flex-row lg:flex-row mt-8 justify-center align-center">
            <Stack className="items-center sm:md:lg:xl:2xl:ml-4 flex-column text-center sm:text-left md:text-left lg:text-left xl:text-left max-w-[400px] w-5/6 md:max-w-[450px] lg:md:max-w-[650px] mt-8" >
              <Typography level="h1" className="text-white">
                Tired of writing cover letters?
                Let us simplify the process. 
                {' '}
                <Typography variant="soft">
                  Unlimited 
                </Typography>
                {' '} cover letters. Only $8/mo.
              </Typography>
              <Typography level="title-lg" className="text-white mt-4">
                It is our goal to make job hunting easier.
                We make generating cover letters as easy as uploading your resume and providing a link to the job posting. That's it.
              </Typography>
              <Stack direction="row" className="mb-8">
                <Link href={'/demo'}>
                  <button
                      className="middle mt-8 none center rounded-md bg-pink-500 py-3 px-6 font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/50 hover:scale-1.10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      data-ripple-light="true"
                      >
                      Try for free
                  </button>
                </Link>
                <Link href={'/plans'}>
                  <button
                      className="middle mt-8 mx-4 bg-sky-800 none center rounded-md py-3 px-6 font-sans text-sm font-bold uppercase text-white shadow-md shadow-sky-800/20 transition-all hover:shadow-lg hover:shadow-sky-800/50 hover:scale-1.10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      data-ripple-light="true"
                      >
                      plans
                  </button>
                </Link>
              </Stack>
            </Stack>
            <Card className="min-w-[300px] max-w-[300px] h-[350px] self-center sm:md:lg:xl:2xlmr-8">
              <Typography level="body-sm" >
                <span ref={el} />
              </Typography>
            </Card>
            
          </Stack>   
          <Stack direction="column">
            <Typography level="title-lg" sx={{marginX: 'auto', paddingTop: 8, color: 'white'}}>
              We support job posting URLs from 
            </Typography>  
            <Stack className="flex flex-col items-center justify-center sm:md:lg:flex-row xl:2xl:flex-row pt-8 gap-4" >
              <Image src="/handshake.png" alt="shandshake logo" width={100} height={56.25}/>
              <Image src="/LI-Logo.png" alt="LinkedIn logo" width={100} height={56.25}/>
              <Image src="/Indeed_Logo_RGB.png" alt="indeed logo" width={100} height={56.25}/>
              <Image src="/glassdoor.png" alt="glassdoorlogo" width={100} height={56.25}/>

            </Stack>
          </Stack>   
          <Stack direction="column" justifyContent="center" alignItems='center' >
            <Typography level="title-lg" sx={{marginX: 'auto', paddingTop: 8, color: 'white'}}>
              User reviews 
            </Typography>  
            <Stack direction="row" justifyContent="center" alignItems="center" className="flex-col gap-2 sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row  pt-4 w-5/6">
              <Card className="w-5/6 min-h-[250px] sm:min-h-[350px] md:min-h-[300px] lg:min-h-[250px] xl:min-h-[150px] 2xl:w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 xl:min-h-[150px]" >
                 "GeCover completely changed how I apply for jobs. It's never been easier to sit down for half an hour and get 10 job applications sent. Amazing product."
                 <Typography className="absolute text-right bottom-0 pb-2 pr-2">
                    - First year engineering at Queen's University
                 </Typography>
              </Card>
              <Card className="w-5/6  min-h-[250px] sm:min-h-[350px] md:min-h-[300px] lg:min-h-[250px] xl:min-h-[150px] 2xl:w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 xl:min-h-[150px]" > 
                "Something about the uniqueness of each response keeps me coming back.. perfectly tailored information from my resume for the job I'm applying to, everytime." 
                <Typography className="absolute text-right bottom-0 pb-2 pr-2">
                    - Second year nursing at University of Calgary
                 </Typography>
              </Card>
              <Card className="w-5/6 min-h-[250px] sm:min-h-[350px] md:min-h-[300px] lg:min-h-[250px] xl:min-h-[150px] 2xl:w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 xl:min-h-[150px]" > 
                "Irreplacible tool for anyone currently looking for a job."
                <Typography className="absolute text-right bottom-0 pb-2 pr-2">
                    - Fourth year business at University of Calgary
                 </Typography>
              </Card>
            </Stack>
          </Stack>    
          <Stack direction="column">
            <Typography level="title-lg" sx={{marginX: 'auto', paddingTop: 8, color: 'white'}}>
              Features
            </Typography>  
            <Stack direction="row" justifyContent="center" sx={{paddingTop: 4}} spacing={2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-5/6">
              <div className="p-6 rounded-lg shadow-md bg-white bg-opacity-20 hover:bg-opacity-50 hover:bg-pink-200 transition ease-in-out">
                <h4 className="text-xl font-semibold mb-3"> Fully Personalized </h4>
                <p> Information in our cover letters is sourced directly from your resume.</p>
              </div>
              <div className=" p-6 rounded-lg shadow-md bg-white bg-opacity-20 hover:bg-opacity-50 hover:bg-pink-200 transition ease-in-out">
                <h4 className="text-xl font-semibold mb-3"> GPT Undetectable</h4>
                <p> Customized to avoid GPT detection by encouraging variation similar to human-generated content</p>
              </div>
              <div className=" p-6 rounded-lg shadow-md bg-white bg-opacity-20 hover:bg-opacity-50 hover:bg-pink-200 transition ease-in-out">
                <h4 className="text-xl font-semibold mb-3"> Unlimited Generation </h4>
                <p> With our pro plan, generate as many cover letters as you need.</p>
              </div>
            </div>
            </Stack>
          </Stack>    
          <Stack direction="column">
            <Typography level="title-lg" sx={{marginX: 'auto', paddingTop: 8, color: 'white'}}>
              Plans
            </Typography>  
            <Stack className="self-center flex-column justify-center w-[90%] sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row py-4 gap-8">
              <Card className="lg:w-1/4 2xl:w-1/6 min-h-[150px]">
                <Typography level="h2">
                  Basic
                </Typography>
                <Typography level="h4">
                  $0 a month
                </Typography>
                <List>
                  <ListItem>
                    <ListItemContent>3 cover letters per week</ListItemContent>
                    <ListItemDecorator><CheckIcon /></ListItemDecorator>
                  </ListItem>
                  <ListItem>
                    <ListItemContent> Use supported job URLs </ListItemContent>
                    <ListItemDecorator><CheckIcon /></ListItemDecorator>
                  </ListItem>
                  <ListItem>
                    <ListItemContent> Access to the newest features </ListItemContent>
                    <ListItemDecorator><CloseIcon /></ListItemDecorator>
                  </ListItem>
                  <ListItem>
                    <ListItemContent> Custom writing styles </ListItemContent>
                    <ListItemDecorator><CloseIcon/></ListItemDecorator>
                  </ListItem>
                </List>
              </Card>
              <Card className="lg:w-1/4 2xl:w-1/6 min-h-[150px]">
                <Typography level="h2">
                  Premium
                </Typography>
                <Typography level="h4">
                  $8 a month
                </Typography>
                <List>
                  <ListItem>
                    <ListItemContent>Unlimited cover letters</ListItemContent>
                    <ListItemDecorator><CheckIcon className="text-green-500"/></ListItemDecorator>
                  </ListItem>
                  <ListItem>
                    <ListItemContent> Support for any URL </ListItemContent>
                    <ListItemDecorator><CheckIcon className="text-green-500"/></ListItemDecorator>
                  </ListItem>
                  <ListItem>
                    <ListItemContent> Access to the newest features </ListItemContent>
                    <ListItemDecorator><CheckIcon className="text-green-500"/></ListItemDecorator>
                  </ListItem>
                  <ListItem>
                    <ListItemContent> Custom writing styles </ListItemContent>
                    <ListItemDecorator><CheckIcon className="text-green-500"/></ListItemDecorator>
                  </ListItem>
                </List>
              </Card>
            </Stack>
           
          </Stack>   
          {/* <Stack direction="column">
            <Typography level="title-lg" sx={{marginX: 'auto', paddingTop: 8, color: 'white'}}>
              Frequently asked questions
            </Typography>  
            
          </Stack>    */}
         
        </div>
      );
}