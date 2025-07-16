import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginApi, RegisterApi } from "../services/allApis";

const Login = ({ login }) => {
const [userDetails,setUserDetails] = useState({
    username:"",
    email:"",
    password:""
})
const navigate = useNavigate()

const handleRegister = async(username,email,password) =>{
    if(!username || !email || !password){
        alert("Please fill the form completely")
    }
    else{
        console.log(username,email,password)
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            alert("Invalid email format")
        }
        else if(!/^[a-zA-Z]+$/.test(username)){
            alert("Invalid name format")
        } 
        else if(!/^.{4,}$/.test(password)){
            alert("Invalid password format")
        } 
        else{
        const result = await RegisterApi(userDetails)
        if(result.status == 200){
            alert("User Registered sucessfully")
            setUserDetails({
            username:"",
            email:"",
            password:"" 
            })
          
          
            navigate("/login")
        }
        else{
            alert("Error happened")
        }}
    }
}

const handleLogin = async(email,pasword) =>{
    console.log(email,pasword)
        if( !email || !pasword){
        alert("Please fill the form completely")
    }
    else{
        const result = await LoginApi({email,pasword})
        if(result.status == 200){
            console.log(result.data)
            sessionStorage.setItem('existingUser',JSON.stringify(result.data.userWithoutSensitiveInfo))
            sessionStorage.setItem('token',result.data.token)
            navigate("/dashboard")
        }
        else{
          alert('Invalid Login Credentials')
        }
    }
}

const handleAuthentication = async() =>{
    const {username,email,password} = userDetails
    !login? handleRegister(username,email,password) : handleLogin(email,password)

}

  return (
    <>
      <div className="flex min-h-[100vh] flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img className="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
            {login?"Sign in to your account":"Registration"}
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3">
            {!login && (
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="username"
                    className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="name"
                    value={userDetails.username}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
                    onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}
                  />
                </div>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={userDetails.email}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
                  onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  value={userDetails.password}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
                  onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-10"
                onClick={handleAuthentication}
              >
                {login ? "Sign in" : "Register"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            {login ? "New User?" : "Already Registered?"}
        
            {login ? (
              <Link to={"/register"}>
                <span className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Register
                </span>
              </Link>
            ) : (
              <Link to={"/login"}>
                <span className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Sign in
                </span>
              </Link>
            )}
           
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
