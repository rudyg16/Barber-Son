import React from 'react';
import { useForm, Controller } from 'react-hook-form';


export enum Service {
  // Residential
  HouseExteriors = "House Exteriors",
  Driveways = "Driveways",
  DecksPatios = "Decks & Patios",
  FencesGates = "Fences & Gates",
  WindowCleaning = "Window Cleaning",
  GutterCleaning = "Gutter Cleaning",

  // Commercial
  OfficeBuildings = "Office Buildings",
  ParkingLots = "Parking Lots",
  Storefronts = "Storefronts",
  Warehouses = "Warehouses",
  DumpsterPads = "Dumpster Pads",
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  service: Service;
  address: string;
  comments: string;
};

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

  const onSubmit = (data: FormValues) => {
     // TODO: Hook to backend
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 max-w-lg mx-auto rounded-sm bg-mint font-roboto"
    >
      <div className="flex flex-col md:flex-row md:justify-center md:gap-x-6">
        {/* First Name */}
        <div className="flex flex-col w-full">
          <input
            {...register('firstName', { required: 'First Name is required' })}
            placeholder="First Name"
            className="border p-2 my-1"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col w-full">
          <input
            {...register('lastName', { required: 'Last Name is required' })}
            placeholder="Last Name"
            className="border p-2 my-1"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
          placeholder="Email"
          className="w-full border p-2 my-1"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <input
          {...register('phoneNumber',{
            required:'Phone number is required',
            onChange:e =>{
              e.target.value = formatPhone(e.target.value)
            }
          })}
          placeholder='(123) 456-7890'
          className='w-full border p-2'
        />
        
      </div>

      {/* Address */}
      <div>
        <input
          {...register('address', { required: 'Address is required' })}
          placeholder="Street Address"
          className="w-full border p-2 my-1"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      {/* Service Select */}
      <div>
        <select
          {...register('service', { required: 'Please select a service' })}
          className="w-full border p-2 my-1"
          defaultValue=""
        >
          <option value="" disabled>
            Select a service
          </option>
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
          className="w-full border p-2 my-1"
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
