import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormValues, Service } from '@/types/form'

const formatPhone = (val: string): string => {
  const digits = val.replace(/\D/g , '').slice(0, 10);
  const parts = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);//^ means match pattern at beginning of string, $ means match at end
  //\d denotes digit 0-9, {0,3} indicates there can be 0-3 in each section, ^$ regex combined means string matches pattern
  if (!parts) return val;

  // 3. Destructure the three groups:
  //    parts[1] = first up-to-3 digits (area code)
  //    parts[2] = next up-to-3 digits (prefix)
  //    parts[3] = last up-to-4 digits (line number)
  const [, area, prefix, line] = parts;

  // 4. Build the formatted string in layers:
  //    - If all three groups have content, show (xxx) xxx-xxxx
  if (line) {
    return `(${area}) ${prefix}-${line}`;
  }
  //    - If only area & prefix are present, show (xxx) xxx
  if (prefix) {
    return `(${area}) ${prefix}`;
  }
  //    - If only area is present, show (xxx
  if (area) {
    return `(${area}`;
  }
  //    - Otherwise, empty string
  return '';
};

const Form = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    mode: 'onTouched',
  });

  const submitFormData = async (url: string, data: FormValues) => {
    try {
      console.log("Sending request to:", url);
      console.log("Request body:", JSON.stringify(data));

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          // You might add an "Accept: application/json" header here too if your API consistently returns JSON
          // "Accept": "application/json",
        },
        body: JSON.stringify(data)
      });

      const text = await response.text();
      if (!response.ok) {
        // If response.ok is false (e.g., 4xx or 5xx status code)
        let errorMessage = `Server responded with status ${response.status}.`;
        try {
          const errorJson = JSON.parse(text);
          errorMessage = errorJson.message || errorMessage;
          console.error("Server error details:", errorJson);
        } catch {
          console.error("Server responded with non-JSON error for status", response.status, ":", text);
        }
        throw new Error(errorMessage);
      }

      try {
        const json = JSON.parse(text);
        console.log("Server returned (success):", json);
        // You can return the parsed data if needed for further processing
        return json;
      } catch {
        console.error("Response was not JSON (but status was OK):", text);
        // This indicates a successful but unexpected response format
        throw new Error("Unexpected response format from server, but request was successful.");
      }
    } catch (error) {
      console.error("Request failed to send:", error);
      // Re-throw the error so onSubmit can catch and display it
      throw error;
    }
  };

  const onSubmit = async (data: FormValues) => {
    // ---- THE CRITICAL CHANGE IS HERE ----
    // This is the direct, default path to your Netlify Function.
    // Replace 'handler' with your actual function filename if it's different.
    const apiEndpoint = `/.netlify/functions/handler`; // <--- No /api/ prefix, no VITE_ variable

    console.log("Resolved API Endpoint:", apiEndpoint);
    try {
      await submitFormData(apiEndpoint, data);
      reset();
      alert('Your message has been sent successfully!');
    } catch (error: any) {
      console.error("Form submission failed:", error);
      alert(`There was an issue submitting your form: ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 py-10 px-6 max-w-lg mx-auto bg-white border shadow-xl border-gray-300 font-roboto"
    >
      {/* ... (Your existing form fields and JSX remain unchanged) ... */}

      <div className="flex flex-col md:flex-row md:justify-center md:gap-x-6">
        {/* First Name */}
        <div className="flex flex-col w-full">
          <div className='text-black font-semibold'>
            First Name
          </div>
          <input
            {...register('firstName', { required: 'First Name is required' })}
            placeholder="First Name"
            className="border border-gray-300 p-2 my-1 "
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col w-full">
          <div className='text-black font-semibold'>
            Last Name
          </div>
          <input
            {...register('lastName', { required: 'Last Name is required' })}
            placeholder="Last Name"
            className="border border-gray-300 p-2 my-1"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <div className='text-black font-semibold'>
          Email
        </div>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
          placeholder="Email"
          className="w-full border border-gray-300 p-2 my-1"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <div className='text-black font-semibold'>
          Phone
        </div>
        <input
          {...register('phoneNumber', {
            required: 'Phone number is required',
            onChange: e => {
              e.target.value = formatPhone(e.target.value)
            }
          })}
          placeholder='(123) 456-7890'
          className='w-full border border-gray-300 p-2'
        />
        {errors.phoneNumber && ( // Add error display for phone number
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <div className='text-black font-semibold'>
          Address
        </div>
        <input
          {...register('address', { required: 'Address is required' })}
          placeholder="Street Address"
          className="w-full border border-gray-300 p-2 my-1"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      {/* Service Select */}
      <div>
        <div className='text-black font-semibold'>
          Service
        </div>
        <select
          {...register('service', { required: 'Please select a service' })}
          className="w-full border border-gray-300 p-2 my-1"
          defaultValue=""
        >
          <option value="" disabled>
            Select a service
          </option>
          {/* Ensure Service is correctly imported and has string values */}
          {Object.entries(Service).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-red-500 text-sm">{errors.service.message}</p>
        )}
      </div>

      {/* Comments */}
      <div>
        <textarea
          {...register('comments')}
          placeholder="Additional Comments (optional)"
          className="w-full border border-gray-300 p-2 my-1"
          rows={4}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
