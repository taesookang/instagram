import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/Routes";
import Header from "../components/Header";
import UserProfile from "../components/profile"


export default function Profile() {
  const { username } = useParams();
  const [profileOwner, setProfileOwner] = useState(null);
  const [userExists, setUserExists] = useState(false);
  const history = useHistory();


  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setProfileOwner(user[0]);
        setUserExists(true);
      } else {
        setUserExists(false);
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
}, [username, history]);


  return userExists ? (
    <div className="bg-gray-background">
        <Header />
      <div className="mx-auto max-w-screen-lg">
          <UserProfile profileOwner={profileOwner} />
      </div>
    </div>
  ) : null;
}
