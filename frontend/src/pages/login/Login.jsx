import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className="p-6 h-full w-full bg-gray-900 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input type="text" placeholder="enter username" className="w-full input input-bordered h-10"/>
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10" />
          </div>
          <Link to="/signup" className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block">Dont' have an account?</Link>
          <div><button className='btn btn-block btn-sm mt-2'>Login</button></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
