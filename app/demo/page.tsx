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
  
  return (
    <div>
      <InputForm session={session}/>
    </div>
  );
}