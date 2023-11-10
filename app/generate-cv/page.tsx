import { Card, Grid, TextField, Button, Typography } from '@mui/material';
import React from 'react';

export default async function GenerateCoverLetter() {

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
                        <input type="file" hidden />
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Enter URL" variant="outlined" />
                    </Grid>
                </Grid>
            </Card>
        </div>
      </div>
    </div>
  );
}