export function seedDatabase(firebase) {
  const users = [
    {
      userId: "2",
      username: "james",
      fullName: "James Lebron",
      emailAddress: "james@lebron.com",
      following: [],
      followers: [],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "curry",
      fullName: "Stephen Curry",
      emailAddress: "stephan@curry.com",
      following: [],
      followers: [],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "davis",
      fullName: "Anthony Davis",
      emailAddress: "anthony@davis.com",
      following: [],
      followers: [],
      dateCreated: Date.now(),
    },
    {
      userId: "5",
      username: "antetokounmpo",
      fullName: "Giannis Antetokounmpo",
      emailAddress: "giannis@antetokounmpo.com",
      following: [],
      followers: [],
      dateCreated: Date.now(),
    },
  ];

  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k]);
  }

  for (let u = 0; u < users.length; u++) {
    for (let i = 1; i <= 3; i++) {
      firebase
        .firestore()
        .collection("photos")
        .add({
          photoId: `${users[u].username + i}`,
          userId: `${users[u].userId}`,
          imageSrc: `/images/users/${users[u].username}/${i}.jpg`,
          caption: "NBA season",
          likes: [],
          comments: [
            {
              displayName: "james",
              comment: "Love this one, brother",
            },
            {
              displayName: "curry",
              comment: "The best scene ever !!",
            },
          ],
          userLatitude: "40.7128°",
          userLongitude: "74.0060°",
          dateCreated: Date.now(),
        });
    }
  }
}
