import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore';
import _ from 'lodash';
import toast from 'react-hot-toast';
import { firestore } from 'utils/firestore';
import { initialValues } from './FilterSortSettings/initialValues';

export const getValues = (arr) => {
  return arr.map((item) => {
    return item?.value?.replace('-', ' ');
  });
};

export const getHeartsByUserAndPost = async (userUid, postId) => {
  const heartsRef = collection(firestore, 'hearts');

  const q = query(
    heartsRef,
    where('userUid', '==', userUid),
    where('postUid', '==', postId)
  );

  const docs = await getDocs(q);

  const r = [];

  docs.forEach((doc) => {
    r.push({ exists: doc.exists(), uid: doc.id });
  });

  return r;
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
  const typeQuery = { property: 'type', operator: '==' };
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

  if (values.type.length > 0) {
    typeQuery.value = values.type;
    queryList.push(typeQuery);
  }

  const queryConditions = queryList.map((condition) => {
    return where(condition.property, condition.operator, condition.value);
  });

  if (values.heartCountSort.length > 0) {
    queryConditions.push(orderBy('heartCount', values.heartCountSort));
  }

  if (values.dateCreated.length > 0) {
    queryConditions.push(orderBy('dateCreated', values.dateCreated));
  }

  const postsRef = collection(firestore, 'posts');

  const q = query(
    postsRef,
    ...queryConditions,
    orderBy('datePostedJS', values.sort),
    limit(pointer)
  );

  try {
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
  } catch (error) {
    setFilterError(true);
    toast(String(error));
  }
};

export const loadMoreData = async (
  cursor,
  pointer,
  recipes,
  setLastVisible,
  setRecipes,
  filterValues,
  setTotalRecipes
) => {
  let queryConditions = [];
  if (!_.isEqual(initialValues, filterValues)) {
    const tagsQuery = { property: 'tags', operator: 'array-contains-any' };
    const genrePrimaryQuery = { property: 'genrePrimary', operator: '==' };
    const genreSecondaryQuery = { property: 'genreSecondary', operator: '==' };
    const typeQuery = { property: 'type', operator: '==' };
    const opQuery = {
      property: 'originalPoster',
      operator: '=='
    };
    const platformQuery = {
      property: 'platform',
      operator: '=='
    };

    const queryList = [];

    if (filterValues.tags.length > 0) {
      tagsQuery.value = getValues(filterValues.tags);
      queryList.push(tagsQuery);
    }

    if (filterValues.primaryGenre.length > 0) {
      genrePrimaryQuery.value = filterValues.primaryGenre;
      queryList.push(genrePrimaryQuery);
    }

    if (filterValues.secondaryGenre.length > 0) {
      genreSecondaryQuery.value = filterValues.secondaryGenre;
      queryList.push(genreSecondaryQuery);
    }

    if (filterValues.op.length > 0) {
      opQuery.value = filterValues.op;
      queryList.push(opQuery);
    }

    if (filterValues.platform.length > 0) {
      platformQuery.value = filterValues.platform;
      queryList.push(platformQuery);
    }

    if (filterValues.type.length > 0) {
      typeQuery.value = filterValues.type;
      queryList.push(typeQuery);
    }

    queryConditions = queryList.map((condition) => {
      return where(condition.property, condition.operator, condition.value);
    });

    if (filterValues.heartCountSort.length > 0) {
      queryConditions.push(orderBy('heartCount', filterValues.heartCountSort));
    }

    if (filterValues.dateCreated.length > 0) {
      queryConditions.push(orderBy('dateCreated', filterValues.dateCreated));
    }
  }

  const postsRef = collection(firestore, 'posts');

  let next;

  if (!_.isEqual(initialValues, filterValues)) {
    console.log('filters cursor', cursor);
    console.log('filters pointer', pointer);
    console.log(filterValues);
    console.log(queryConditions);
    const q = query(
      postsRef,
      ...queryConditions,
      orderBy('dateCreated', filterValues.sort)
    );
    const total = await getDocs(q);

    setTotalRecipes(total.docs.length);
    console.log(total.docs.length);

    next = query(
      postsRef,
      ...queryConditions,
      orderBy('dateCreated', filterValues.sort),
      startAfter(cursor),
      limit(pointer)
    );
  } else {
    console.log('no filters cursor', cursor);
    console.log('no filters pointer', pointer);

    next = query(
      postsRef,
      orderBy('dateCreated', 'asc'),
      startAfter(cursor),
      limit(pointer)
    );
  }

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

  const first = query(postsRef, orderBy('dateCreated', 'asc'), limit(pointer));
  const snapshot = await getDocs(first);
  setLastVisible(snapshot.docs[snapshot.docs.length - 1]);

  const r = [];
  snapshot.forEach((doc) => {
    r.push(doc.data());
  });

  setRecipes(r);
};

export const fetchLikedPostsByUser = async (userUid) => {
  const heartsRef = collection(firestore, 'hearts');

  const q = query(heartsRef, where('userUid', '==', userUid));

  const docs = await getDocs(q);

  const r = [];

  docs.forEach((doc) => {
    r.push(doc.data().postUid);
  });

  return r;
};
