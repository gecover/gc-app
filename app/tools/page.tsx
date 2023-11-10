import { getSession } from '@/app/supabase-server';

import { redirect } from 'next/navigation';
import Logo from '@/components/icons/Logo';

import React from 'react';
import Link from 'next/link';
import { Card, CardActionArea, Typography } from '@mui/material';


export default async function Tools() {
  //const session = await getSession();

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
            <Link href="/generate-cv" passHref>
                <Card>
                    <CardActionArea>
                        <Typography gutterBottom variant="h5" component="div" sx={{ padding: '20px', textAlign: 'center' }}>
                            Generate Cover Letter
                        </Typography>
                    </CardActionArea>
                </Card>
            </Link>
        </div>
      </div>
    </div>
  );
}
