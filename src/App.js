import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/Routes";
import userContext from "./context/user";
import useAuthListener from "./hooks/useAuthListener";
import { ClipLoader } from "react-spinners";

import ProtectedRoute from "./helpers/ProtectedRoute";
import IsUserLoggedIn from "./helpers/IsUserLoggedIn";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { user } = useAuthListener();
  return (
    <userContext.Provider value={{ user }}>
      <Router>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <ClipLoader color={"#005c98"} loading={true} size={50} />
            </div>
          }
        >
          <Switch>
            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.LOGIN}
            >
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.SIGNUP}
            >
              <SignUp />
            </IsUserLoggedIn>
            <Route path={ROUTES.PROFILE} component={Profile} />
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </userContext.Provider>
  );
}

export default App;
