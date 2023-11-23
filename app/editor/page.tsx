import React from 'react';
import {
  getSession,
  getUserDetails
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import QuillEditor from './QuillEditor';


export default async function EditCoverLetter() {
  const [session, userDetails] = await Promise.all([
    getSession(),
    getUserDetails()
  ]);

//   if (!session) {
//     return redirect('/signin');
//   }

//   if (!userDetails) {
//     return redirect('/signin');
//   }

  

  return (
    <div>
      <QuillEditor session={session} />
    </div>
  );
};