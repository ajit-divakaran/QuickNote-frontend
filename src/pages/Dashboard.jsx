import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dialog from '../components/Dialog';

const Dashboard = () => {
const [dialogOpen, setDialogOpen] = useState(false);
const [name,setName] = useState('')
const navigate = useNavigate()
useEffect(()=>{
    if(!sessionStorage.getItem("token")){
        navigate('/error')
    }
    else{
        setName(JSON.parse(sessionStorage.getItem("existingUser")).username)
        console.log("In dashboard")
    }
},[])
  return (

     <>
     <h1>Welcome {name}</h1>
          <div className="grid grid-cols-1 auto-rows-minmax-300px-auto sm:grid-cols-3 lg:grid-cols-4 gap-y-5 sm:gap-x-2 place-items-center">
            {[...new Array(15)].map((x,id)=>(
    
            <div key={id} className="card p-8 inline-block rounded border-1 border-gray-600 dark:border-gray-200 relative group">
                <h1>Hello There</h1>
                <hr />
                <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eius iure quis ullam nisi!</p>
                      <button
            className=" view-btn bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-in-out "
            onClick={() => setDialogOpen(true)}
          >
            View Note
          </button>
    
          <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />
            </div>
            ))}
        </div>
     </>
  )
}

export default Dashboard