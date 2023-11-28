import Box from '@mui/material/Box';
import Image from 'next/image';

export default function Page() {
  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-12 lg:px-8">
        <div className="flex flex-col sm:flex sm:flex-col align-center justify-center">
          <h1 className="text-4xl font-extrabold text-white  sm:text-4xl">
            <span className="underline">How to Generate Your First Gecover</span>
          </h1>
          <Box className="">
            <h2 className="text-2xl pt-8 font-extrabold text-white sm:text-2xl">1 - Sign in to your GeCover account</h2>
            <sub>
              <span className="underline">Note:</span> If you do not have an account, you can register using your email or through one of our providers.
            </sub>
            <Image 
              src="/tutorial-signin.png" 
              alt="Image on how to sign in." 
              width={800}
              height={600}
            />
            <h2 className="text-2xl pt-8 font-extrabold text-white sm:text-2xl">2 - Navigate to Tutorial</h2>
            <Image 
              src="/tutorial-tutorial.png" 
              alt="Image for accessing tutorials page." 
              width={800}
              height={600}
            />
            <h2 className="text-2xl pt-8 font-extrabold text-white sm:text-2xl">3 - Upload your Resume to Gecover</h2>
            <sub>
              <span className="underline">Note:</span> Currently we only support PDF format. More soon.
            </sub>
            <h3 className="pt-8 font-extrabold text-white">3.1 - Select File or Drag and Drop</h3>
            <sub>
              When your resume has been uploaded properly, you will see a green checkmark.
            </sub>
            <Image 
              src="/tutorial-pdf-upload.png" 
              alt="Image for Uploading a PDF" 
              width={800}
              height={600}
            />
            <h2 className="text-2xl pt-8 font-extrabold text-white sm:text-2xl">4 - Upload Job Posting Link/URL to GeCover</h2>
            <sub>
              <span className="underline">Note:</span> Currently we only support LinkedIn Job Postings.
            </sub>
            <h3 className="pt-8 font-extrabold text-white">4.1 - Go to LinkedIn Jobs</h3>
            <h3 className="pt-8 font-extrabold text-white">4.2 - Find a Job</h3>
            <h3 className="pt-8 font-extrabold text-white">4.3 - Once Previewing the Job, click the title to be brought to the Job Page</h3>
            <h3 className="pt-8 font-extrabold text-white">4.4 - Copy Link/URL and paste it in GeCover</h3>
            <sub>
              <span className="underline">Note:</span> <b>On mobile</b>, you must paste the link in a notes file and copy the link from the message.
            </sub>
            <Image 
              src="/tutorial-linkedin.png" 
              alt="Image for Uploading a PDF" 
              width={800}
              height={600}
            />
            <h2 className="text-2xl pt-8 font-extrabold text-white sm:text-2xl">5 - Generate Your First GeCover!</h2>
            <sub>
              <span className="underline">Note:</span> Processing time is approximately 30 seconds. This can sometimes be longer due to current rate limitations.
            </sub>
            <h2 className="text-2xl pt-8 font-extrabold text-white sm:text-2xl">6 - Download your GeCover as a PDF or textfile</h2>
            <Image 
              src="/tutorial-generate-pdf.png" 
              alt="Image for Uploading a PDF" 
              width={800}
              height={600}
            />
          </Box>
        </div>
      </div>
    </section>
  );
}