import { useState } from 'react';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export const Main = () => {
  const [step, setStep] = useState(1);
  const [selectedAge, setSelectedAge] = useState('');
  const [showError, setShowError] = useState(false);


  const nextStep = () => {
    if (step === 2 && !selectedAge) {
        setShowError(true);

      return;

    }
    setShowError(false);

    setStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    if (step === 3) {
      setSelectedAge('');
    }
    setStep(prevStep => prevStep - 1);
  };

  const handleAgeChange = (event) => {
    setSelectedAge(event.target.value);
  };

  return (
    <main className="flex flex-col items-center justify-center mx-auto ">

      <h3 className="text-5xl font-bold leading-[4rem] tracking-widest text-center pt-4 uppercase shadow-lg ">
        Apply for my coaching Below
      </h3>


    <div className='px-3 py-6 lg:flex lg:items-center lg:gap-7'>

    
        <div  className='rounded-lg max-lg:hidden'>

            <video muted={false} src="https://videos.pexels.com/video-files/3126044/3126044-uhd_2560_1440_25fps.mp4" controls className='max-w-[470px] object-cover h-[400px] rounded-lg'></video>

            
        </div>

      <section className=" w-[400px] mt-4 p-7 border-t-2 border-b-2 border-gray-600 rounded-lg ">
        {step === 1 && (
          <>
            <h5 className="mb-5 text-4xl font-bold">
              Great to hear you're <span className='text-white/90'>ready to transform</span>  your physique!
              Let's get you on the road to success.
            </h5>
            <p className='italic'>
              I take each client seriously and need a moment to customise your experience because each journey is different. Let's begin!
            </p>
            <button onClick={nextStep} className="flex p-2  mx-[80%] mt-4 text-white/90 bg-black font-semibold rounded ">
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <section className='flex flex-col gap-3'>
            <h5 className="text-4xl font-bold">Step 2: <span className='text-white/80'>Age</span> </h5>
            <p>Please select your age range:</p>
            
            <div>
              <input type="radio" id='18-24' name="age" value="18-24" onChange={handleAgeChange} className="p-2 mt-2 border rounded" />
              <label className='ml-2' htmlFor="18-24">18-24</label>
            </div>
           
            <div>
              <input type="radio" id='25-30' name="age" value="25-30" onChange={handleAgeChange} className="p-2 mt-2 border rounded" />
              <label className='ml-2' htmlFor="25-30">25-30</label>   
            </div>
             
            <div>
              <input type="radio" id='30-45' name="age" value="30-45" onChange={handleAgeChange} className="p-2 mt-2 border rounded" />
              <label className='ml-2' htmlFor="30-45">30-45</label>   
            </div>
                 
            <div>
              <input type="radio" id='45+' name="age" value="45+" onChange={handleAgeChange} className="p-2 mt-2 border rounded" />
              <label className='ml-2' htmlFor="45+">45+</label>   
            </div>    

                        {showError && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert className='transition-all duration-300 ' severity="error">Please select an age range.</Alert>
              </Stack>
            )}            

            <div className="flex justify-between mt-4 ">
              <button onClick={prevStep} className="p-2 px-4 font-semibold text-black rounded bg-white/80">
                Prev
              </button>
              <button onClick={nextStep} className="p-2 px-4 font-semibold bg-black rounded text-white/90 ">
                Next
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <>
            <h5 className="text-4xl font-bold ">Step 3: <br /> <span className='text-white/80'>Registration</span> </h5>


            <div className="flex flex-col mt-2">

            <label htmlFor="name">First Name*</label>
            <input type="name" className='border-2 rounded-md gray-600 ' />

            <label htmlFor="LastName">Last Name*</label>
            <input type="text" className='border-2 rounded-md gray-600 ' />

            <label htmlFor="email">Email Address*</label>
            <input type="email" className='border-2 rounded-md gray-600 ' />

            <label htmlFor="name">Phone Number*</label>
            <input type="phone" className='border-2 rounded-md gray-600 ' />

            <div className='mt-4 mb-2'> 
            <input type="checkbox" id='terms' />
            
             <label className='ml-3 ' htmlFor="terms">I agree to terms & conditions provided by the company. By providing my phone number, I agree to receive text messages from the business.</label>
         
            </div>

            <Stack sx={{ width: '100%' }} spacing={2} className='mb-3'>
                <Alert className='transition-all duration-300 ' severity="error">Please select an age range.</Alert>
              </Stack>
         

            </div>
           <div className='flex justify-between'>
            <button onClick={prevStep} className="p-2 px-4 font-semibold text-black rounded bg-white/80 ">
                Prev
              </button>

              <button onClick={nextStep}  className="p-2 font-semibold text-white bg-black rounded">
                Submit
              </button>
              </div>
          </>
)}





{step === 4 && (
          <>
            <h5 className="py-2 text-4xl font-bold">Step 4:  <p className='pt-3 text-white/80'>Confirmation</p> </h5>
            <p className=''>Review your information and submit.</p>
            <div className="flex justify-between mt-4">
              <button onClick={prevStep} className="p-2 px-4 font-semibold text-black rounded bg-white/80">
                Prev
              </button>
              <button className="p-2 text-white bg-green-500 rounded">
                Confirm
              </button>
            </div>
          </>
        )}
      </section>

      </div>
    </main>
  );
};