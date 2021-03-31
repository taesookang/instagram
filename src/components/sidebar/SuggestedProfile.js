import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { updateFollowing, updateFollowers } from '../../services/firebase'

export default function SuggestedProfile({
  profileDocId,
  username,
  profileId,
  userId,
  userDocId
}) {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
      setFollowed(true);

      await updateFollowing(userDocId, profileId, false)

      await updateFollowers(profileDocId, userId, false)
  }

  return !followed ? (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt="suggested-profile"
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-sm font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string,
  username: PropTypes.string,
  profileId: PropTypes.string,
  userId: PropTypes.string,
  currentUserDocId: PropTypes.string
};
