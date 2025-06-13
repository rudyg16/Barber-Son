import {useForm} from 'react-hook-form'

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
  name:string;
  email:string;
  service:Service;
  phoneNumber:string;
  address:string;
  comments:string;

};
const Form =()=>{
    const {register,handleSubmit,formState:{ errors, isValid },watch,reset,setValue
    }=useForm<FormData>()
    const onSubmit: = (data:FormData) =>{
        console.log(data);//API call 
        reset();
    }
    return
};
export default Form;