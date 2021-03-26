import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import firebaseContext from "../context/firebase";
import * as ROUTES from "../constants/Routes";
import { doesUserNameExist } from "../services/firebase";

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(firebaseContext);

  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleSignUp = async (e) => {
    e.preventDefault();

    const userNameExists = await doesUserNameExist(userName);
    if (!userNameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        await createdUserResult.user.updateProfile({
          displayName: userName,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: userName.toLowerCase(),
          fullName,
          emailAddress: emailAddress,
          following: [],
          followers:[],
          dateCreated: Date.now(),
        });

        history.push(ROUTES.DASHBOARD);
      } catch (err) {
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(err.message);
      }
    } else {
      setUserName('');
      setError('The username is already taken, please try another.');
    }

    try {
    } catch (err) {}
  };

  useEffect(() => {
    document.title = "Sign Up - instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone instagram" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white mb-4 p-4 border border-gray-primary rounded ">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" alt="" className="mt-2 mb-4 w-6/12" />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              type="text"
              aria-label="Enter your username"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 mb-3 py-5 px-4 h-2 border border-gray-primary rounded"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
            <input
              type="text"
              aria-label="Enter your full name"
              placeholder="Fullname"
              className="text-sm text-gray-base w-full mr-3 mb-3 py-5 px-4 h-2 border border-gray-primary rounded"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            <input
              type="text"
              aria-label="Enter email address"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 mb-3 py-5 px-4 h-2 border border-gray-primary rounded"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
            />
            <input
              type="password"
              aria-label="Enter password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 mb-3 py-5 px-4 h-2 border border-gray-primary rounded"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full h-10 rounded font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Have an account? {``}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
