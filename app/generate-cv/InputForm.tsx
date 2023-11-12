'use client';
import { Card, Grid, TextField, Button, Typography } from '@mui/material';
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

import { Session } from '@supabase/supabase-js';

interface Props {
  session: Session;
}

export default function InputForm({ session }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async () => {
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

   if (url) {
      try {
        const response = await axios.post('http://localhost:5000/extract_url/', { url });
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching URL:', error);
      }
    }
  };

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
            <Card>
                <Typography gutterBottom variant="h4" component="div">
                    Generate Cover Letter
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Button variant="contained" component="label">
                      Upload Document
                      <input type="file" hidden onChange={handleFileChange}
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}> 
                    <TextField fullWidth label="Enter URL" variant="outlined" onChange={handleUrlChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}
                    >
                      Generate
                    </Button>
                  </Grid>
                </Grid>
            </Card>
        </div>
      </div>
    </div>
  );
}
