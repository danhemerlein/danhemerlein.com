import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { firestore } from 'utils/firestore';

export const handleAddToFavorites = () => {
  return toast('you must log in to use this feature');
};

const getValues = (arr) => {
  return arr.map((item) => {
    return item.value.replace('-', ' ');
  });
};

export const handleFilterSort = async (
  values,
  setFilterError,
  setRecipes,
  pointer
) => {
  const tagsQuery = { property: 'tags', operator: 'array-contains-any' };
  const genrePrimaryQuery = { property: 'genrePrimary', operator: '==' };
  const genreSecondaryQuery = { property: 'genreSecondary', operator: '==' };
  const opQuery = {
    property: 'originalPoster',
    operator: '=='
  };
  const platformQuery = {
    property: 'platform',
    operator: '=='
  };

  const queryList = [];

  if (values.tags.length > 0) {
    tagsQuery.value = getValues(values.tags);
    queryList.push(tagsQuery);
  }

  if (values.primaryGenre.length > 0) {
    genrePrimaryQuery.value = values.primaryGenre;
    queryList.push(genrePrimaryQuery);
  }

  if (values.secondaryGenre.length > 0) {
    genreSecondaryQuery.value = values.secondaryGenre;
    queryList.push(genreSecondaryQuery);
  }

  if (values.op.length > 0) {
    opQuery.value = values.op;
    queryList.push(opQuery);
  }

  if (values.platform.length > 0) {
    platformQuery.value = values.platform;
    queryList.push(platformQuery);
  }

  const postsRef = collection(firestore, 'posts');

  const queryConditions = queryList.map((condition) => {
    return where(condition.property, condition.operator, condition.value);
  });

  const q = query(
    postsRef,
    ...queryConditions,
    orderBy('datePostedJS', values.sort),
    limit(pointer)
  );

  const docs = await getDocs(q);

  const r = [];

  docs.forEach((doc) => {
    r.push(doc.data());
  });

  if (r.length === 0) {
    setFilterError(true);
  } else {
    setFilterError(false);
    setRecipes(r);
  }
};

export const loadMoreData = async (
  cursor,
  pointer,
  recipes,
  setLastVisible,
  setRecipes
) => {
  const postsRef = collection(firestore, 'posts');

  const next = query(postsRef, startAfter(cursor), limit(pointer));
  const nextSnapshots = await getDocs(next);

  setLastVisible(nextSnapshots.docs[nextSnapshots.docs.length - 1]);

  const r = [];
  nextSnapshots.forEach((doc) => {
    r.push(doc.data());
  });

  setRecipes([...recipes, ...r]);
};

export const fetchPostData = async (
  pointer,
  setTotalRecipes,
  setLastVisible,
  setRecipes
) => {
  const postsRef = collection(firestore, 'posts');

  const q2 = query(postsRef);
  const totalSnapshot = await getDocs(q2);

  setTotalRecipes(totalSnapshot.size);

  const first = query(
    postsRef,
    orderBy('datePostedJS', 'desc'),
    limit(pointer)
  );
  const snapshot = await getDocs(first);
  setLastVisible(snapshot.docs[snapshot.docs.length - 1]);

  const r = [];
  snapshot.forEach((doc) => {
    r.push(doc.data());
  });

  setRecipes(r);
};
