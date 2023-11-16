import React from 'react';
import {
    getSession
  } from '@/app/supabase-server';
import Contact from './Contact';


export default async function ContactPage() {
    const [session] = await Promise.all([
        getSession()
      ]);
    
      return (
        <Contact
          session={session}
        />
      );
}