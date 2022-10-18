import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { firestore } from 'utils/firestore';

export const handleAddToFavorites = (user, recipeUid, recipeName) => {
  if (!user.uid.length) {
    return toast('you must log in to use this feature');
  }

  const data = {
    id: `${user.uid}-${recipeUid}`,
    userUid: user.uid,
    postUid: recipeUid
  };

  addDocument('hearts', data);

  updateHeartCount(recipeUid, 'increment');

  toast(`liked ${recipeName}`);
};

export const handleRemoveFromFavories = (user, heartId, recipeUid) => {
  if (!user.uid.length) {
    return toast('you must log in to use this feature');
  }

  if (heartId) {
    const heartExists = checkDocumentExistenceById('hearts', heartId);
    if (heartExists) {
      deleteDocById('hearts', heartId);
      updateHeartCount(recipeUid, 'decrement');
    }
    toast('unliked successfully');
  }
};

export const updateHeartCount = async (postUid, direction) => {
  const postDoc = doc(firestore, 'posts', postUid);

  const snapshot = await getDoc(postDoc);

  const r = [];
  r.push(snapshot.data());
  const count = r[0].heartCount;

  if (direction === 'increment') {
    await updateDoc(postDoc, {
      heartCount: count + 1
    });
  } else {
    await updateDoc(postDoc, {
      heartCount: count - 1
    });
  }
};

export const getAllDocsInACollection = async (collectionName) => {
  const ref = collection(firestore, collectionName);
  const q = query(ref);
  const docs = await getDocs(q);

  const r = [];

  docs.forEach((doc) => {
    r.push(doc.data());
  });

  return r;
};

export const deleteDocById = async (collectionName, docId) => {
  if (collectionName && docId) {
    const q = query(doc(firestore, collectionName, docId));
    const snapshot = await getDoc(q);
    const r = [];
    if (snapshot.exists) {
      r.push(deleteDoc(snapshot.ref));
      Promise.all(r).then((d) => {});
    }
  } else {
    console.error(
      'please provide a collection name and document id for deletion'
    );
  }
};

export const deleteAllDocsInACollection = async (collectionName) => {
  const q = query(collection(firestore, collectionName));
  const snapshot = await getDocs(q);

  const deleteOps = [];

  snapshot.forEach((doc) => {
    deleteOps.push(deleteDoc(doc.ref));
  });

  Promise.all(deleteOps).then((d) => {});
};

export const addDocument = async (collectionName, data) => {
  const ref = doc(firestore, collectionName, data.id);

  console.log(data);

  const docu = await getDoc(ref);

  try {
    if (!docu.exists()) {
      const d = await setDoc(doc(firestore, collectionName, data.id), data);
      return d;
    }
    return new Error('a document with that id already exists');
  } catch (err) {
    return new Error(err);
  }
};

export const addDocumentNonSpecifiedId = async (collectionName, data) => {
  const d = await addDoc(collection(firestore, collectionName), data);
  return d;
};

export const checkDocumentExistenceById = async (collectionName, id) => {
  const ref = doc(firestore, collectionName, id);

  const docu = await getDoc(ref);

  return docu.exists();
};

export const getDocumentById = async (collectionName, id) => {
  const ref = doc(firestore, collectionName, id);

  const docu = await getDoc(ref);

  const data = docu.data();

  const r = data;
  return r;
};
