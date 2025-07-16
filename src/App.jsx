import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import React from 'react';


function App() {
        const [dark, setDark] = React.useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

  return (
    // dark:text-[#9f9fa9]
         <div className="dark:bg-[#18181b] dark:text-white relative  ">
            <button className="absolute right-0 top-0 z-10 w-[15%] border-1 dark:border-white bg-gray border-black py-2  mt-2 mx-2 rounded-full" onClick={()=> darkModeHandler()}>
                {
                    
                    dark && <div ><i className="fa-solid fa-moon mr-4"></i>Dark</div>
                }
                {
                    !dark && <div><i class="fa-solid fa-sun mr-4"></i>Light</div>
                }
            </button>
      <Routes>
        <Route path='/' element={<Login login={true}/>}/>
        <Route path='/login' element={<Login login={true}/>}/>
        <Route path='/register' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
        </div>
    
  )
}

export default App
