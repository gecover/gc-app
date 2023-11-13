import React from 'react';
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import ToolBar from './ToolBar';


export default async function Tools() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  if (!session) {
    return redirect('/signin');
  }
  
  // VALIDATE USER SUBSCRIPTION STATUS  
  if (!subscription) {
    return redirect('/');
  }

  return (
    <div>
      <ToolBar session={session}/>
    </div>
  );
}