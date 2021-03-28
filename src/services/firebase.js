import { firebase, FieldValue } from '../lib/firebase'

export async function doesUserNameExist(username) {
    const result = await firebase
      .firestore()
      .collection("users")
      .where("username", "==", username.toLowerCase())
      .get();

    console.log(Boolean(result.docs.length > 0))

    return Boolean(result.docs.length > 0)
}

export async function getUserByUserID(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))

  return user;
}