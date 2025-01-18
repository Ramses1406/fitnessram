import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Step2 = ({ nextStep, prevStep, handleAgeChange, showError }) => (
  <section className='flex flex-col gap-3'>
    <h5 className="text-4xl font-bold">Step 2: <span className='text-white/80'>Age</span> </h5>
    <p className="text-gray-300">Please select your age range:</p>
    <div>
      <input 
        type="radio" 
        id='18-24' 
        name="age" 
        value="18-24" 
        onChange={handleAgeChange} 
        className="p-2 mt-2 border rounded accent-red-500/80" 
      />
      <label className='ml-2 text-red-500' htmlFor="18-24">18-24</label>
    </div>
    <div>
      <input 
        type="radio" 
        id='25-30' 
        name="age" 
        value="25-30" 
        onChange={handleAgeChange} 
        className="p-2 mt-2 border rounded accent-red-500/80" 
      />
      <label className='ml-2 text-gray-300' htmlFor="25-30">25-30</label>
    </div>
    <div>
      <input 
        type="radio" 
        id='30-45' 
        name="age" 
        value="30-45" 
        onChange={handleAgeChange} 
        className="p-2 mt-2 border rounded accent-red-500/80" 
      />
      <label className='ml-2 text-gray-300' htmlFor="30-45">30-45</label>
    </div>
    <div>
      <input 
        type="radio" 
        id='45+' 
        name="age" 
        value="45+" 
        onChange={handleAgeChange} 
        className="p-2 mt-2 border rounded accent-red-500/80" 
      />
      <label className='ml-2 text-gray-300' htmlFor="45+">45+</label>
    </div>
    {showError && (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert 
          className='transition-all duration-300 border bg-red-500/20 text-red-400/80 border-red-400/20' 
          severity="error"
          sx={{
            '& .MuiAlert-icon': {
              color: 'rgba(248, 113, 113, 0.8)'
            }
          }}
        >
          Please select an age range.
        </Alert>
      </Stack>
    )}
    <div className="flex justify-between mt-4">
      <button 
        onClick={prevStep} 
        className="p-2 px-4 font-semibold transition-colors rounded text-white/90 bg-gray-800/50 hover:bg-gray-800/70"
      >
        Prev
      </button>
      <button 
        onClick={nextStep} 
        className="p-2 px-4 font-semibold text-white transition-colors rounded bg-red-600/80 hover:bg-red-600"
      >
        Next
      </button>
    </div>
  </section>
);

export default Step2;