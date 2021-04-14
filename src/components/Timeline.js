import React from "react";
import usePhotos from "../hooks/usePhotos";
import Post from "./post";
import PostLoader from "./loader/PostLoader";

export default function Timeline() {
  const { photos } = usePhotos();

  let loaders = []

  for(let i=0; i<=4; i++) {
      loaders.push(<PostLoader key={i}/>)
  }

  return (
    <div className="container col-span-2">
      {!photos ? (
        loaders
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
}
