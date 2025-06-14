import react from 'react'
import {useForm,Controller} from 'react-hook-form'
import InputMask from 'react-input-mask'

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
  firstName:string;
  lastName:string;
  email:string;
  service:Service;
  phoneNumber:string;
  address:string;
  comments:string;

};

const Form =()=>{
    const {register, handleSubmit, formState:{ errors, isValid }, reset} = useForm<FormValues>({
      mode:'onTouched'
    });

    const onSubmit = (data:FormValues) =>{
      console.log(data);//API call
      reset();
    };

    return(
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 p-4 max-w-lg mx-auto rounded-sm bg-mint font-roboto'>
        <div>
          <div className='flex flex-col md:flex-row md:justify-center md:gap-x-6'>
            {/* First Name */}
            <div className='flex flex-col w-full'>
              <input
                {...register('firstName', { required: 'First Name is required' })}
                placeholder='First Name'
                className='border p-2 my-1'
              />
              {errors.firstName && (
                <p className='text-red-500 text-sm'>{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div className='flex flex-col w-full '>
              <input
                {...register('lastName', { required: 'Last Name is required' })}
                placeholder='Last Name'
                className='border p-2 my-1'
              />
              {errors.lastName && (
                <p className='text-red-500 text-sm'>{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <input
          {...register('email',{required:'Email is required'})}
          placeholder='Email'
          className='w-full order p-2 my-1'/>
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email.message}</p>
          )}
          {/*Phone*/}
          <Controller
            name='phone'
            control={control}
            defaultValue='' 
            rules={ {required: 'Phone-number is required'} }
            render={({field}) =>(
              <InputMask
              {...field}
                mask='(999) 999-9999'
                maskChar=''
                className='w-full order p-2 my-1'
                placeholder=''
              />
            )}
            />                    
        </div>

      </form>

    );
};
export default Form;