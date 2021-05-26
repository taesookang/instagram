import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const User = ({ username, fullName }) => {
  return !username || !fullName ? (
    <div className="flex">
      <Skeleton count={1} circle={true} width={60} height={60} />
      <div className="flex flex-col ml-2 justify-center">
        <Skeleton width={80} height={24} />
        <Skeleton width={100} height={18} />
      </div>
    </div>
  ) : (
    <Link to={`/p/${username}`}>
      <div className="hidden sm:grid grid-cols-4 gap-4 mb-6 items-center">
        <div className="flex items-center justify-between col-span-1">
          <img
            className="rounded-full w-16 mr-3"
            src={`images/avatars/${username}.jpg`}
            alt="user"
          />
        </div>
        <div className="col-span-3">
          <p className="font-bold text-sm">{username}</p>
          <p className="text-sm">{fullName}</p>
        </div>
      </div>
    </Link>
  );
};

export default memo(User);

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string
};
