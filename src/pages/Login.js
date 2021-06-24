import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import firebaseContext from "../context/firebase";
import * as ROUTES from "../constants/Routes";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(firebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";
  const testButtonDisable = emailAddress === "test@test.com" && password === "akskdkfk1"

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (err) {
      setEmailAddress("");
      setPassword("");
      setError(err.message);
    }
  };

  const useTestAccount = () => {
    setEmailAddress("test@test.com");
    setPassword("akskdkfk1");
  }

  useEffect(() => {
    document.title = "Login - instagrid";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md justify-center items-center h-screen">
      <div className="hidden sm:flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone instagram" />
      </div>
      <div className="w-4/5 flex flex-col sm:w-2/5">
        <div className="flex flex-col items-center bg-white mb-4 p-4 border border-gray-primary rounded ">
          <div className="flex justify-center w-full">
            <img src="/images/instagrid.png" alt="" className="mt-2 mb-4 w-6/12" />
          </div>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
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
              Log In
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Don't have an account? {``}
            <Link to={ROUTES.SIGNUP} className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>

        <button 
          className={`bg-blue-medium text-white w-full h-10 mt-4 rounded font-semibold ${
            testButtonDisable && "opacity-50"
          }`}
          onClick={useTestAccount}
          disabled={testButtonDisable}
        >Try with testing account</button>
      </div>
    </div>
  );
}
