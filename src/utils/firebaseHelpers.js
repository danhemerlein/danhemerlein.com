import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc
} from 'firebase/firestore';
import { firestore } from 'utils/firestore';

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

export const deleteAllDocsInACollection = async (collectionName) => {
  const q = query(collection(firestore, collectionName));
  const snapshot = await getDocs(q);

  const deleteOps = [];

  snapshot.forEach((doc) => {
    deleteOps.push(deleteDoc(doc.ref));
  });

  Promise.all(deleteOps).then((d) => {
    return console.log('documents deleted');
  });
};

export const addDocument = async (collectionName, data) => {
  const ref = doc(firestore, collectionName, data.id);

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
