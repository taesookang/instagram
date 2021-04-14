import React from 'react'
import Skeleton from "react-loading-skeleton";

export default function PostLoader() {
    
  return (
    <>
    <div className="flex items-center mb-3">
      <Skeleton className="ml-2" circle={true} width={50} height={50} />
      <Skeleton className="ml-4" width={100} height={20} />
    </div>
      <Skeleton count={1} height={500} className="mb-5 w-full" />
    </>
  );
}
