//'use client';

import React from 'react';
import Link from 'next/link';
import { Stack, Card, CardActionArea, Typography } from '@mui/material';
import Button from '@/components/ui/Button';

import { Session } from '@supabase/supabase-js';

interface Props {
  session: Session | null;
}

export default function ToolBar({ session }: Props) {
  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Gecover Tools
          </h1>
          <ToolButtons />
        </div>
      </div>
    </section>
  );
}
const tools = [
    {
        name: 'Gecover',
        description: 'Generate Custom Tailored Cover Letters today.'
    },
    {
        name: 'Resume Refiner',
        description: 'AI Data-Driven-Resume Insights. Coming Soon!'
    }
]

function ToolButtons() {
  return (
    <section className="bg-black">
    <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
      <div className="sm:flex sm:flex-col sm:align-center">
        {tools.map((tool, index) => (
          <div key={index} className="relative flex self-center mt-12 border rounded-lg bg-zinc-900 border-zinc-800">
            <div className="border border-pink-500 border-opacity-50 divide-y rounded-lg shadow-sm bg-zinc-900 divide-zinc-600">
              <div className="p-6 py-2 m-1 text-2xl font-medium text-white rounded-md shadow-sm border-zinc-800 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8">
                <p>
                  <span className="text-5xl font-extrabold white">
                    {tool.name}
                  </span>
                </p>
                <p className="mt-4 text-zinc-300">
                  {tool.description}
                </p>
                {tool.name !== 'Resume' ? ( // TODO IMPLEMENT RESUME
                  <Link href={`/${tool.name.toLowerCase()}`} passHref>
                    <Button
                      variant="slim"
                      type="button"
                      className="block w-full py-2 mt-12 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                    >
                      Use
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="slim"
                    type="button"
                    disabled={true}
                    className="block w-full py-2 mt-12 text-sm font-semibold text-center text-white rounded-md opacity-50 cursor-not-allowed"
                  >
                    Coming Soon
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
}