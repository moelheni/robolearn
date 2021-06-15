import firebase from "firebase/app";

import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIMWRC4yxtjPAlScODIFGhD-BRxAs9nAE",
  authDomain: "curious-kids-7fa1a.firebaseapp.com",
  projectId: "curious-kids-7fa1a",
  storageBucket: "curious-kids-7fa1a.appspot.com",
  messagingSenderId: "883613922610",
  appId: "1:883613922610:web:90b38c8e9d5dbe4965532b",
  measurementId: "G-YJMCPPGX4F"
}

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const addIdentifiant = async ({identifiant, help}) => {
  const snapshot = await db.doc(`users/${identifiant}`).get()
  if (snapshot.exists) {
    console.log('identifiant exists')
    return snapshot.data()
  } else {
    await db.collection(`users`).doc(identifiant).set({
      identifiant,
      help,
      createdAt: firebase.firestore.Timestamp.now()
    })

    const snapshot = await db.doc(`users/${identifiant}`).get()
    return snapshot.data()
  }
}

export const addUserInput = async (identifiant, phase, id, data) => {
  await db.collection(`users`).doc(identifiant).collection(phase).doc(id.replace(/ /g, '_')).set({
    ...data,
    createdAt: firebase.firestore.Timestamp.now()
  })
}