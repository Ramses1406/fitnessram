import { useState } from 'react';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import image1 from "../src/assets/images/pexels-823sl-2294403.jpg";
import image2 from "../src/assets/images/pexels-leonardho-1552249.jpg";
import image3 from "../src/assets/images/pexels-olly-905336.jpg";
import image4 from "../src/assets/images/pexels-823sl-2294403.jpg";
import image5 from "../src/assets/images/pexels-leonardho-1552249.jpg";

function App() {
  const [count, setCount] = useState(0)
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    agreement: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Gallery images
  const images = [
    {
      original: image1,
      thumbnail: image1,
    },
    {
      original: image2,
      thumbnail: image2,
    },
    {
      original: image3,
      thumbnail: image3,
    },
    {
      original: image4,
      thumbnail: image4,
    },
    {
      original: image5,
      thumbnail: image5,
    },
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user interacts
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Add immediate validation on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Single field validation
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          newErrors[name] = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        } else {
          delete newErrors[name];
        }
        break;
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      // ... similar cases for other fields
    }

    setErrors(newErrors);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate all fields
    let formIsValid = true;
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      formIsValid = false;
      newErrors.firstName = 'First name is required';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      formIsValid = false;
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email.trim()) {
      formIsValid = false;
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      formIsValid = false;
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.phone.trim()) {
      formIsValid = false;
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      formIsValid = false;
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Password validation
    if (!formData.password.trim()) {
      formIsValid = false;
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      formIsValid = false;
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
      formIsValid = false;
      newErrors.password = 'Password must contain uppercase, lowercase and numbers';
    }

    // Agreement validation
    if (!formData.agreement) {
      formIsValid = false;
      newErrors.agreement = 'You must accept the terms and conditions';
    }

    // Set any errors found
    setErrors(newErrors);

    // If form is not valid, stop here
    if (!formIsValid) {
      return;
    }

    // If we get here, form is valid
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        registeredAt: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Success
      alert('Registration successful!');
      setIsLoginOpen(false);
      
      // Reset form
      setFormData({ 
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        agreement: false 
      });
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add function to handle step navigation
  const nextStep = () => {
    const isStepValid = validateCurrentStep();
    if (isStepValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Add validation for each step
  const validateCurrentStep = () => {
    const newErrors = {};
    let isValid = true;

    switch (currentStep) {
      case 1:
        // Validate personal info
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
          isValid = false;
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
          isValid = false;
        }
        break;
      case 2:
        // Validate contact info
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
          isValid = false;
        }
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
          isValid = false;
        } else if (!phoneRegex.test(formData.phone)) {
          newErrors.phone = 'Please enter a valid phone number';
          isValid = false;
        }
        break;
      case 3:
        // Validate password and agreement
        if (!formData.password.trim()) {
          newErrors.password = 'Password is required';
          isValid = false;
        } else if (formData.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
          isValid = false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
          newErrors.password = 'Password must contain uppercase, lowercase and numbers';
          isValid = false;
        }
        if (!formData.agreement) {
          newErrors.agreement = 'You must accept the terms and conditions';
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="w-full min-h-screen bg-slate-500">
      <div className="w-full px-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <Header />
          </div>
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="px-4 py-2 mt-4 mr-4 font-medium text-white transition-colors duration-300 bg-black rounded-lg hover:bg-white hover:text-black"
          >
            Login
          </button>
        </div>

        {/* Add back Main component */}
        <Main />
        
        {/* Add back Gallery */}
        <div className="flex justify-center mx-auto w-fit">
          <ReactImageGallery 
            items={images}
            showPlayButton={false}
            autoPlay={true}
            slideDuration={700}
            slideInterval={5000}
            additionalClass="justify-center mt-4 mx-auto rounded-lg object-cover"
          />
        </div>

        {/* Login Modal */}
        {isLoginOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={() => setIsLoginOpen(false)}
          >
            <div 
              className="w-full max-w-md p-8 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Sign In</h2>
                <button 
                  onClick={() => setIsLoginOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {[1, 2, 3].map(step => (
                    <div
                      key={step}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === currentStep
                          ? 'bg-blue-600 text-white'
                          : step < currentStep
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {step < currentStep ? '✓' : step}
                    </div>
                  ))}
                </div>
                <div className="relative w-full h-2 bg-gray-700 rounded-full">
                  <div
                    className="absolute h-full transition-all duration-300 bg-blue-600 rounded-full"
                    style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {currentStep === 1 && (
                  <>
                    <h2 className="mb-4 text-xl font-bold text-white">Personal Information</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">First Name*</label>
                        <input 
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 text-white bg-gray-800 border ${
                            errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-blue-500'
                          } rounded-lg focus:outline-none transition-colors`}
                          placeholder="John"
                          onBlur={handleBlur}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Last Name*</label>
                        <input 
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 text-white bg-gray-800 border ${
                            errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-blue-500'
                          } rounded-lg focus:outline-none transition-colors`}
                          placeholder="Doe"
                          onBlur={handleBlur}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <h2 className="mb-6 text-2xl font-bold text-white">
                      Contact Information
                      <span className="block mt-2 text-sm font-normal text-gray-400">
                        Please enter your contact details
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {/* Email Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-gray-800 border placeholder-gray-500 ${
                              errors.email 
                                ? 'border-red-500 focus:ring-red-500 text-red-400' 
                                : 'border-gray-700 focus:ring-blue-500 text-emerald-400'
                            } rounded-lg focus:outline-none focus:ring-2 transition-all`}
                            placeholder="john.doe@example.com"
                            onBlur={handleBlur}
                          />
                          {errors.email && (
                            <div className="flex items-center mt-2 space-x-2 text-red-500 animate-shake">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              <p className="text-sm font-medium">{errors.email}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input 
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-gray-800 border placeholder-gray-500 ${
                              errors.phone 
                                ? 'border-red-500 focus:ring-red-500 text-red-400' 
                                : 'border-gray-700 focus:ring-blue-500 text-emerald-400'
                            } rounded-lg focus:outline-none focus:ring-2 transition-all`}
                            placeholder="+1 (555) 555-5555"
                            onBlur={handleBlur}
                          />
                          {errors.phone && (
                            <div className="flex items-center mt-2 space-x-2 text-red-500 animate-shake">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              <p className="text-sm font-medium">{errors.phone}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Helper Text */}
                    <div className="mt-4 text-sm text-gray-400">
                      <p>We'll never share your contact details with anyone else.</p>
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <h2 className="mb-4 text-xl font-bold text-white">Security</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Password*</label>
                        <input 
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 text-white bg-gray-800 border ${
                            errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-blue-500'
                          } rounded-lg focus:outline-none transition-colors`}
                          placeholder="********"
                          onBlur={handleBlur}
                        />
                        {errors.password && (
                          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            name="agreement"
                            checked={formData.agreement}
                            onChange={handleInputChange}
                            className={`w-4 h-4 rounded ${
                              errors.agreement ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-blue-500`}
                            onBlur={handleBlur}
                          />
                          <label className="text-sm text-gray-300">
                            I agree to the Terms and Conditions*
                          </label>
                        </div>
                        {errors.agreement && (
                          <p className="text-sm text-red-500">{errors.agreement}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-2 text-gray-300 transition-colors hover:text-white"
                    >
                      Back
                    </button>
                  )}
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;