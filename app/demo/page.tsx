import React from 'react';
import {
  getSession
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import InputForm from './InputForm';


export default async function GenerateCoverLetter() {
  const [session] = await Promise.all([
    getSession()
  ]);

  if (!session) {
    return redirect('/signin');
  }

  if (!userDetails) {
    return redirect('/signin');
  }
  let name = ''
  if (userDetails.full_name){
    name = userDetails.full_name
  }

  return (
    <div>
      <InputForm session={session} userName={name}/>
    </div>
  );
}