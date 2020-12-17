import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDF3OLXkUrak7qSKvx4UVFNvROiLj1k680",
    authDomain: "raychat-51e3e.firebaseapp.com",
    projectId: "raychat-51e3e",
    storageBucket: "raychat-51e3e.appspot.com",
    messagingSenderId: "637398469165",
    appId: "1:637398469165:web:4344b5c70181b369c006a4"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const auth=firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();
  const fb = new firebase.auth.FacebookAuthProvider();
  export {auth,provider,fb};