const isAuthed = firebaseProps => {
  const { isSignedIn, firebase } = firebaseProps;
  return !!(isSignedIn && firebase.auth);
};

export { isAuthed }