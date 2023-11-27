import React from 'react';
import {
  getSession,
  getUserDetails
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import InputForm from './InputForm';


export default async function GenerateCoverLetter() {
  const [session, userDetails] = await Promise.all([
    getSession(),
    getUserDetails()
  ]);

  if (!session) {
    return redirect('/signin');
  }

  if (!userDetails) {
    return redirect('/signin');
  }
  

  let name = 'you need to enter your name in account'
  try{
    if (userDetails.full_name){
      name = userDetails.full_name
    }
  } catch {
    // todo: add a redirect to /account paired with an error message to user.
    console.error("user needs to input their name on the account.")
  }
  

  return (
    <div>
      <InputForm session={session} userName={name}/>
    </div>
  );
}