import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import { getPhotosByUsername } from "../../services/firebase";
import Photos from "./Photos";

export default function UserProfile({ profileOwner }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getPhotosByUsername(profileOwner.username);

      dispatch({
        profile: profileOwner,
        photosCollection: photos,
        followerCount: profileOwner.followers.length,
      });
    }

    
    getProfileInfoAndPhotos();
  }, [profileOwner]);


  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

UserProfile.propTypes = {
  profileOwner: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
  }).isRequired,
};
