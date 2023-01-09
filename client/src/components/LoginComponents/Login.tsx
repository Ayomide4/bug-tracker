import image from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/assets/login.jpg'  

interface Props {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ({setTrigger} : Props) {
  
  const handleClick = () => {
    setTrigger((prev) => !prev)
  }

  return (
      <div className='bg-white w-2/5 h-full flex justify-center '>
          <div className='flex flex-col  w-96'> 
            <h1 className='text-2xl font-bold pb-6 w-full mt-48'>Sign In</h1>
            <div className='pb-4 flex flex-col w-full'>
              <label className='font-semibold'>Email Address</label>
              <input className=' border-b-2 border-gray-500 w-full'/>
            </div>
            <div className='flex flex-col pb-4 w-full'>
              <label className='font-semibold'>Password</label>
              <input className='border-b-2 border-gray-500  w-full'/>
            </div>
            <div className='flex mb-6'>
              <input type='checkbox'/>
              <label className='w-full ml-2'>Remember Me</label>
            </div>
          <button className='bg-[#1D3557] w-full text-white h-10 rounded mb-6'>Log In</button>
          <p>Don't have an account? Sign up <span onClick={handleClick} className='font-bold cursor-pointer underline'>here</span></p>
          </div>      
      </div>
  )
}
