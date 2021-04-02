import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Header({ username }) {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
            <div className="rounded-full border-2 h-10 w-10 mr-3 border-red-primary flex items-center justify-center">

          <img
            className="flex rounded-full h-8 w-8"
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile`}
          />
            </div>
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = { 
    username: PropTypes.string.isRequired
}