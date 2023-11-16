import Box from '@mui/material/Box';
import Image from 'next/image';

export default function Page() {
  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-12 lg:px-8">
        <div className="flex flex-col sm:flex sm:flex-col align-center justify-center">
          <h1 className="text-4xl font-extrabold text-white  sm:text-4xl">
            How to Generate Your First Gecover
          </h1>
          <Box className="">
             <p className='pt-4 text-lg'>1 - Sign in to your Gecover account. 
              <br></br>
              <sub>
                <span className="underline">Note:</span> If you do not have an account, you can register using your email or one of our providers.
              </sub>
            </p>
            <Image 
              src="/tutorial-signin.png" 
              alt="Description of the image" 
              width={800}
              height={600}
            />
            <p className='pt-4 text-lg'>2 - Navigate to Tutorial</p>
            <Image 
              src="/tutorial-tutorial.png" 
              alt="Description of the image" 
              width={800}
              height={600}
            />
            <h2 className="text-2xl pt-8 font-extrabold text-white sm:text-2xl"> Web Browser: </h2>
            <p className='pt-4 text-lg'> 3: Upload your Resume. 
            <br></br>
            <sub>
              <span className="underline">Note:</span> Currently we only support PDF format.
            </sub>
            </p>

             <p className='pt-4 text-lg'> 4: Upload the LinkedIn link to the job posting(currently working on making this easier) </p>
             <p className='pt-4 text-lg'> 4.1: Go to LinkedIn jobs </p>
             <p className='pt-4 text-lg'> 4.2: Click on the job you want to apply to </p>
             <p className='pt-4 text-lg'> 4.3: Once previewing the job, click the job title to be brought to the job page </p>
             <p className='pt-4 text-lg'> 4.4: Copy this URL and paste it in GeCover </p>
             <p className='pt-4 text-lg'> 5: Generate PDF! </p>

             <h2 className="text-2xl pt-8 font-extrabold text-white  sm:text-2xl"> On mobile </h2>
             <p className='pt-4 text-lg'> 3: Upload your PDF </p>
             <p className='pt-4 text-lg'> 4: Find your job on the LinkedIn App </p>
             <p className='pt-4 text-lg'> 5: In the three dots in the top right, click "share via" and copy the link </p>
             <p className='pt-4 text-lg'> 6: Paste that into notes, and copy out just the link </p>
             <p className='pt-4 text-lg'> 7: Upload your link into GeCover </p>
             <p className='pt-4 text-lg'> 8: Generate your PDF! </p>
          </Box>
        </div>
        
      </div>
    </section>
  );
}