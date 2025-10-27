import React from "react";
import { Zap } from "lucide-react";
import Navbar from "./Navbar";

const RateLimited = () => {
  return (
    <div className="bg-black h-screen w-screen">
      <div className="flex gap-5 text-white items-center justify-center border border-green-800 rounded-xl m-10 p-5">
        <div className="rounded-4xl p-4 bg-green-400">
          <Zap color="green" size={35} />
        </div>
        <div>
          <h1 className="text-xl font-bold ">Rate Limit Reached</h1>
          <p className="text-[rgb(226,223,223)]">
            You've mad too many requests in a short period. Please wait a
            moment.
          </p>
          <p className="text-xs text-[rgb(219,219,216)]">Try again in a few seconds for the best experience.</p>
        </div>
      </div>
    </div>
  );
};

export default RateLimited;
