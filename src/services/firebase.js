import { FieldValue, firebase } from "../lib/firebase";

export async function doesUserNameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();

  return Boolean(result.docs.length > 0);
}
export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user.length > 0 ? user : false;
}

export async function getUserByUserID(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

export async function updateFollowing(userDocId, profileId, isFollowing) {
  return await firebase
    .firestore()
    .collection("users")
    .doc(userDocId)
    .update({
      following: isFollowing
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}
export async function updateFollowers(profileDocId, userId, isFollowing) {
  return await firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowing
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserID(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", user.userId)
    .get();

  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  return photos;
}

export async function isUserFollowingProfile(currentUserId, profileUserId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", currentUserId)
    .where("following", "array-contains", profileUserId)
    .get();

  const response = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.length > 0 ? true : false
}

export async function toggleFollow(
  profileDocId,
  userId,
  profileId,
  userDocId,
  isFollowing
) {
  await updateFollowing(userDocId, profileId, isFollowing);
  await updateFollowers(profileDocId, userId, isFollowing);
}