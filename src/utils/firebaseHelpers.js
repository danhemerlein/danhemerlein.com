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

export const addDocument = async (
  collectionName,
  data,
  setFormErrorSuccess
) => {
  console.log('running add document');
  const ref = doc(firestore, collectionName, data.id);

  const docu = await getDoc(ref);

  try {
    if (!docu.exists()) {
      await setDoc(doc(firestore, collectionName, data.id), data);
      setFormErrorSuccess({
        error: false,
        message: 'SUCCESS: document created'
      });
    } else {
      setFormErrorSuccess({
        error: true,
        message: 'ERROR: a document with that ID already exists'
      });
    }
  } catch (err) {
    setFormErrorSuccess({
      error: true,
      message: err
    });
  }
};
