import React from "react";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col justify-center h-screen w-full mx-auto">
        <div className="flex flex-start w-full items-center">
          <img className="w-32 ml-4" src="images/Instagrid.png" alt="logo" />
          <div className="w-full ml-4 h-6 flex items-center bg-blue-medium text-white text-lg font-semibold pl-4">
            ERROR
          </div>
        </div>
        <div className="m-16">
          <h1 className="text-5xl font-bold">NOT FOUND</h1>
          <p className="mt-4 text-lg">The requested URL was not found on this server.</p>
        </div>

        <div className="w-full h-4 bg-blue-medium" />
      </div>
    </>
  );
}
