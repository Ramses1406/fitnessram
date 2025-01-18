import { useState } from 'react';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';

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
    <main className="relative min-h-screen bg-[#111] text-white overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[#111] z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Hero Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-[#111]" />
        </div>

        {/* Hero Content */}
        <div className="relative h-screen flex flex-col items-center justify-center px-4">
          <h3 className="text-5xl md:text-6xl font-bold leading-tight tracking-wider text-center mb-6 text-white">
            Apply for my coaching
          </h3>
          <p className="text-xl md:text-2xl text-gray-200 text-center max-w-2xl mb-8">
            Transform your life with professional guidance and personalized training programs
          </p>
          <a 
            href="#apply"
            className="bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition-colors duration-300 hover:scale-105 transform"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Application Form Section */}
      <div id="apply" className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-black/30 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-white/5">
            <div className="lg:flex lg:items-center lg:gap-7">
              <div className="rounded-lg max-lg:hidden lg:w-1/2">
                <video 
                  muted={false} 
                  src="https://videos.pexels.com/video-files/3126044/3126044-uhd_2560_1440_25fps.mp4" 
                  controls 
                  className="w-full h-[400px] rounded-lg object-cover"
                />
              </div>
              <div className="lg:w-1/2">
                <section className="w-full p-7 border-t border-b border-gray-700/30 rounded-lg backdrop-blur-sm">
                  {step === 1 && <Step1 nextStep={nextStep} />}
                  {step === 2 && (
                    <Step2
                      nextStep={nextStep}
                      prevStep={prevStep}
                      handleAgeChange={handleAgeChange}
                      showError={showError}
                    />
                  )}
                  {step === 3 && <Step3 nextStep={nextStep} prevStep={prevStep} />}
                  {step === 4 && <Step4 prevStep={prevStep} />}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;