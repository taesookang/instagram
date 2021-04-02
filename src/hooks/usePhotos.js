import { useState, useEffect, useContext } from "react";
import userContext from "../context/user";
import { getPhotos, getUserByUserID } from "../services/firebase";

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = "" },
  } = useContext(userContext);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      const [{ following }] = await getUserByUserID(userId);
      let followedUserPhotos = [];

      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }

      followedUserPhotos.sort((a, b) => b.dataCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    };
    getTimelinePhotos();
  }, [userId]);

  return { photos };
}
