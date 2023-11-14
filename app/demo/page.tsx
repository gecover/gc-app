import React from 'react';
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import InputForm from './InputForm';


export default async function GenerateCoverLetter() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  if (!session) {
    return redirect('/signin');
  }
  
//   if (!subscription) {
//     return redirect('/');
//   }
  if (!userDetails?.full_name) {
    return redirect('/signin');
  }

  return (
    <div>
      <InputForm session={session} username={userDetails.full_name}/>
    </div>
  );
}