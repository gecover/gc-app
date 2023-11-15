import Link from 'next/link';

export default function Landing() {
    return (
        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="text-center p-20">
            <h2 className="text-2xl mb-6">Tired of writing cover letters?</h2>
            <h2 className="text-5xl font-bold mb-6"> Generate with GeCover - fast.</h2>
            <Link href={'/demo'}>
              <button
                  className="middle mt-8 none center rounded-md bg-pink-500 py-3 px-6 font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/50 hover:scale-1.10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-light="true"
                  >
                  instant custom cover letters
              </button>
            </Link>
            
          </section>
          
          <section id="features" className="container mx-auto p-8">
            <h3 className="text-3xl text-center font-semibold mb-8">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg shadow-md bg-white bg-opacity-20 hover:bg-opacity-50 hover:bg-pink-200 transition ease-in-out">
                <h4 className="text-xl font-semibold mb-3"> Fully Personalized </h4>
                <p> Information in our cover letters is sourced directly from your resume using tech from Cohere.</p>
              </div>
              <div className=" p-6 rounded-lg shadow-md bg-white bg-opacity-20 hover:bg-opacity-50 hover:bg-pink-200 transition ease-in-out">
                <h4 className="text-xl font-semibold mb-3"> GPT Undetectable</h4>
                <p> Customized to avoid GPT detection by encouraging variation similar to human-generated content</p>
              </div>
              <div className=" p-6 rounded-lg shadow-md bg-white bg-opacity-20 hover:bg-opacity-50 hover:bg-pink-200 transition ease-in-out">
                <h4 className="text-xl font-semibold mb-3"> Unlimited Generation </h4>
                <p> With our pro plan, generate as many cover letters as you need.</p>
              </div>
            </div>
          </section>
        </div>
      );
}