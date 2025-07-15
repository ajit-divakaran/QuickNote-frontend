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
         <div className="dark:bg-[#18181b] dark:text-white relative ">
            <button className="absolute right-0 top-0 z-10 w-1/6 border-1 dark:border-white bg-gray border-black" onClick={()=> darkModeHandler()}>
                {
                    
                    dark && <div >Dark</div>
                }
                {
                    !dark && <div>Light</div>
                }
            </button>
      <Routes>
        <Route path='/login' element={<Login login={true}/>}/>
        <Route path='/register' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
        </div>
    
  )
}

export default App
