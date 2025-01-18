import React from 'react';

const Step1 = ({ nextStep }) => (
  <>
    <h5 className="mb-5 text-4xl font-bold">
      Great to hear you're <span className='text-white/90'>ready to transform</span> your physique!
      Let's get you on the road to success.
    </h5>
    <p className='italic'>
      I take each client seriously and need a moment to customise your experience because each journey is different. Let's begin!
    </p>
    <button onClick={nextStep} className="flex p-2 mx-[80%] mt-4 text-white/90 bg-black font-semibold rounded">
      Next
    </button>
  </>
);

export default Step1;
