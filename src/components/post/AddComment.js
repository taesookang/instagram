import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import firebaseContext from "../../context/firebase";
import userContext from "../../context/user";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(firebaseContext);
  const {
    user: { displayName },
  } = useContext(userContext);

  const handleSubmitComment = (e) => {
    e.preventDefault();

    setComments([{ displayName, comment }, ...comments]);
    setComment('');

    return firebase
    .firestore()
    .collection('photos')
    .doc(docId)
    .update({
        comments: FieldValue.arrayUnion({ comment, displayName })
    })
  };
  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(e) =>
          comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()
        }
      >
        <input
          arid-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          ref={commentInput}
        />
        <button className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
            type="button"
            disabled={comment.length < 1}
            onClick={handleSubmitComment}
        >
            Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
};
