'use client';
import React from 'react';
import {TextField, Button} from '@mui/material';

import { Session } from '@supabase/supabase-js';

// interface Props {
//     session: Session;
//   }

export default function Contact() {

    return (
    <>
        <section className="bg-black">
            <div className="max-w-6xl py-8 px-4 mx-auto sm:py-16 sm:px-6 lg:px-8">
                <div className="sm:flex sm:flex-col sm:align-center">

                    <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                        Contact Us
                    </h1>
                    <p className="text-lg pt-4 font-bold text-white sm:text-center sm:text-xl">
                        Have questions or need assistance? Get in touch with us.
                    </p>

                    <div className="mt-8">
                        <div className="border border-pink-500 border-opacity-50 rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900 p-6">
                            <div className="space-y-6">

                                <TextField 
                                    fullWidth 
                                    label="Your Name" 
                                    variant="outlined" 
                                    className="text-field-custom"
                                    InputLabelProps={{
                                        className: "text-white"
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

                                <TextField 
                                    fullWidth 
                                    label="Your Email" 
                                    variant="outlined" 
                                    className="text-field-custom"
                                    InputLabelProps={{
                                        className: "text-white"
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

                                <TextField 
                                    fullWidth 
                                    label="Message" 
                                    variant="outlined" 
                                    multiline
                                    rows={4}
                                    className="text-field-custom"
                                    InputLabelProps={{
                                        className: "text-white"
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

                                <Button 
                                    variant="contained" 
                                    style={{
                                        backgroundColor: '#ec4899',
                                        color: 'white',
                                    }}
                                >
                                    Send Message
                                </Button>

                                <div className="text-white pt-4">
                                    <p>Alternatively, you can email us directly at: <a href="mailto:gecover@gmail.com" className="font-bold text-pink-500">gecover@gmail.com</a></p>
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