

function App() {

  return (
    <div className='bg-white min-h-screen w-full '>
      {/*Initial Header */}
        <div className=' flex flex-row flex-wrap bg-maroon font-roboto items-center py-20 px-5 gap-x-10'>
          {/*Left column */}
          <div className="flex flex-col flex-nowrap  flex-[1]">
            <h1 className='text-4xl font-bold text-white py-3 '>
              Professional Pressure <br>
              </br>Washing Services
            </h1>
            <h3 className='mx-auto text-white mt-4'>
            Trusted by homeowners and businesses alike, we restore your property’s beauty with powerful, professional pressure washing — safe, effective, and satisfaction guaranteed.
            </h3>
          <div className="flex flex-row flex-wrap gap-x-4 my-4 max-w-screen-sm  font-medium text-sm">
            <a
              className="px-7 py-3 bg-teal hover:bg-teal_hover  text-white shadow-md border border-white rounded-xl  mt-2 transition-all "
              href="./Quote.tsx"
            >
              <div >Get Free Quote</div>
              
            </a>
            <a
              className="px-7 py-3 bg-transparent hover:bg-white hover:bg-opacity-25 text-white shadow-md rounded-xl  border border-white mt-2 transition-colors duration-300"
              href="./Services.tsx"
            >
              <div >View Services</div>
            </a>
          </div>

          </div>

          {/*Right column*/}
          <div className=" justify-endflex-[1]">
            <img className=' max-w-[100%] h-auto'
            src='/placeholder.jpg'
            />
          </div>
        </div>
        {/*End initial header */}
      <div className='flex flex-col mt-20 font-roboto'>
          <div className='text-center'>
            <h3 className="text-3xl  font-bold text-maroon ">
              Our Services
            </h3>
          </div>
        <div className='flex flex-row my-4 max-w-[80%]'>
          

        </div>


        </div>
    </div>
  
  );
};

export default App
