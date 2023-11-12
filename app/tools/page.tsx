//'use client';

import React from 'react';
import Link from 'next/link';
import { Stack, Card, CardActionArea, Typography } from '@mui/material';

import { Session, User } from '@supabase/supabase-js';
//import { useRouter } from 'next/navigation';

interface Props {
  session: Session | null;
  user: User | null | undefined;
}

export default function Tools({
  session,
  user
}: Props) {
  
  //const router = useRouter();
  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Gecover Tools
          </h1>
          {/* <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
             Generate custom tailored cover letters. Resume refiner coming soon.
          </p> */}
          <ToolButtons />
        </div>
      </div>
    </section>
  );
}

function ToolButtons() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ margin: '48px' }}
    >
      <Link href="/generate-cv" passHref>
        <Card>
            <CardActionArea>
                <Typography gutterBottom variant="h5" component="div" sx={{ padding: '20px', textAlign: 'center' }}>
                    Generate Cover Letter
                </Typography>
            </CardActionArea>
        </Card>
      </Link>
      <Link href="/resume" passHref>
          <Card>
              <CardActionArea>
                  <Typography gutterBottom variant="h5" component="div" sx={{ padding: '20px', textAlign: 'center' }}>
                      Refine Resume
                  </Typography>
              </CardActionArea>
          </Card>
      </Link>          
    </Stack>
  );
}