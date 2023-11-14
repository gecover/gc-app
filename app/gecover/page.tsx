import React from 'react';
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
// import InputForm from './InputForm';


export default async function GenerateCoverLetter() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);
  //const user = session?.user;

  // VALIDATE USER LOGIN SESSION
  // CHECK AUTH TOKEN directly?
  if (!session) {
    return redirect('/signin');
  }
  
  // VALIDATE USER SUBSCRIPTION STATUS  
  if (!subscription) {
    return redirect('/');
  }

  return (
    <div>
      {/* <InputForm session={session}/> */}
    </div>
  );
}