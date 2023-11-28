"use client"

import React from 'react';
import Link from 'next/link';
import { Card, Stack, Typography } from '@mui/joy';
import Typed from 'typed.js';

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
          <Stack direction="row">
            <Stack direction="column" alignItems='center' sx={{ maxWidth: 400, marginLeft: 16, marginTop:8 }}>
              <Typography level="h1" sx={{color: 'white'}}>
                Tired of writing cover letters?
                Let us write them for you. 
                {' '}
                <Typography variant="soft"  sx={{}}>
                  Unlimited 
                </Typography>
                {' '} cover letters. Only $8/mo.
              </Typography>
              <Stack direction="row">
                <Link href={'/demo'}>
                  <button
                      className="middle mt-8 none center rounded-md bg-pink-500 py-3 px-6 font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/50 hover:scale-1.10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      data-ripple-light="true"
                      >
                      Try the demo
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
            <Card sx={{width: 300, maxWidth: 300, height: 320, alignSelf: 'center', marginLeft: 'auto', marginRight: 24, marginTop: 8}}>
              <Typography level="body-sm" >
                <span ref={el} />
              </Typography>
            </Card>
            
          </Stack>          
          <section id="features" className="container mx-auto p-8">
            <h3 className="text-3xl text-center font-semibold mb-8">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg shadow-md bg-white bg-opacity-20 hover:bg-opacity-50 hover:bg-pink-200 transition ease-in-out">
                <h4 className="text-xl font-semibold mb-3"> Fully Personalized </h4>
                <p> Information in our cover letters is sourced directly from your resume using tech from Cohere.</p>
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
          </section>
        </div>
      );
}