import React from 'react';

const Step4 = ({ prevStep }) => (
  <>
    <h5 className="py-2 text-4xl font-bold">Step 4: <p className='pt-3 text-white/80'>Confirmation</p> </h5>
    <p>Review your information and submit.</p>
    <div className="flex justify-between mt-4">
      <button onClick={prevStep} className="p-2 px-4 font-semibold text-black rounded bg-white/80">
        Prev
      </button>
      <button className="p-2 text-white bg-green-500 rounded">
        Confirm
      </button>
    </div>
  </>
);

export default Step4;