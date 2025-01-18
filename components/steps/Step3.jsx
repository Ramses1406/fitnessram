import React, { useState } from 'react';

const ErrorMessage = ({ message }) => (
  <div className="flex items-center gap-2 mt-1 text-sm">
    <div className="relative group">
      <div className="absolute flex w-5 h-5 -left-2 -top-1">
        <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-red-500/20"></span>
        <span className="relative inline-flex w-5 h-5 rounded-full bg-red-500/40"></span>
      </div>
      <span className="ml-4 text-red-400/80">{message}</span>
    </div>
  </div>
);

const Step3 = ({ nextStep, prevStep }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    terms: false
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    terms: ''
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim() === '' ? `${name === 'firstName' ? 'First' : 'Last'} name is required` :
               !/^[A-Za-z\s]+$/.test(value) ? 'Only letters are allowed' : '';
      case 'email':
        return value.trim() === '' ? 'Email is required' :
               !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : '';
      case 'phone':
        return value.trim() === '' ? 'Phone number is required' :
               !/^\d{10}$/.test(value.replace(/\D/g, '')) ? 'Phone must be 10 digits' : '';
      case 'terms':
        return !value ? 'You must agree to the terms and conditions' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, fieldValue)
    }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors[key] = validateField(key, formData[key]);
    });
    
    setErrors(newErrors);

    if (Object.values(newErrors).every(error => error === '')) {
      nextStep();
    }
  };

  const inputClassName = (fieldName) => `
    border-2 rounded-md gray-600 p-2 text-black
    ${errors[fieldName] 
      ? 'border-red-300/30 bg-red-50/10' 
      : 'border-gray-300/20'
    }
    focus:outline-none focus:ring-2 focus:ring-opacity-30
    transition-all duration-200
  `;

  return (
    <>
      <h5 className="text-4xl font-bold">Step 3: <br /> <span className='text-white/80'>Registration</span></h5>
      <div className="flex flex-col mt-2 space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={inputClassName('firstName')}
          />
          {errors.firstName && <ErrorMessage message={errors.firstName} />}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={inputClassName('lastName')}
          />
          {errors.lastName && <ErrorMessage message={errors.lastName} />}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClassName('email')}
          />
          {errors.email && <ErrorMessage message={errors.email} />}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number*</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="1234567890"
            className={inputClassName('phone')}
          />
          {errors.phone && <ErrorMessage message={errors.phone} />}
        </div>

        <div className='mt-4'>
          <div className="flex items-start">
            <input
              type="checkbox"
              id='terms'
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="w-4 h-4 mt-1 rounded text-red-500/80 border-gray-300/30 focus:ring-red-500/50"
            />
            <label className='ml-3 text-sm text-gray-300' htmlFor="terms">
              I agree to terms & conditions provided by the company. By providing my phone number, 
              I agree to receive text messages from the business.
            </label>
          </div>
          {errors.terms && <ErrorMessage message={errors.terms} />}
        </div>
      </div>

      <div className='flex justify-between mt-8'>
        <button 
          onClick={prevStep} 
          className="p-2 px-4 font-semibold transition-colors rounded text-white/90 bg-gray-800/50 hover:bg-gray-800/70"
        >
          Prev
        </button>
        <button 
          onClick={handleSubmit} 
          className="p-2 px-4 font-semibold text-white transition-colors rounded bg-red-600/80 hover:bg-red-600"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Step3;