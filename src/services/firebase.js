import { FieldValue, firebase } from "../lib/firebase";

export async function doesUserNameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();

  return Boolean(result.docs.length > 0);
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

export async function updateFollowing(
  userDocId,
  profileId,
  isFollowing
) {
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
export async function updateFollowers(
  profileDocId, 
  userId, 
  isFollowing
) {
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
