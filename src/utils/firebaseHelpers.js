import { collection, getDocs, query } from 'firebase/firestore';
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
