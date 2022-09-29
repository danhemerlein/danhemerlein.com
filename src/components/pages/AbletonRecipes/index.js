import Button from 'components/base/Button';
import Loading from 'components/other/Loading';

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FlexContainer, P } from 'styles/elements';
import { getAllDocsInACollection } from 'utils/firebaseHelpers';
import { firestore } from 'utils/firestore';
import * as styles from './AbletonRecipes.styles';
import FilterSortSettings from './FilterSortSettings';
import Hero from './Hero';
import Recipe from './Recipe';

const AbletonRecipes = () => {
  const [funMode, setFunMode] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const [ops, setOPs] = useState([]);
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(undefined);
  const [showFilterSort, setShowFilterSet] = useState(true);
  const [recipes, setReceipes] = useState([]);
  const [lastVisible, setLastVisible] = useState({});

  const POINTER = 10;

  const handleAddToFavorites = () => {
    return toast('you must log in to use this feature');
  };

  const getValues = (arr) => {
    return arr.map((item) => {
      return item.value.replace('-', ' ');
    });
  };

  const handleFilterSort = async (values) => {
    console.log(values);
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
      orderBy('datePostedJS', values.sort)
    );

    const docs = await getDocs(q);

    const r = [];

    docs.forEach((doc) => {
      r.push(doc.data());
    });

    setReceipes(r);
  };

  const loadMoreData = async (cursor, pointer) => {
    const postsRef = collection(firestore, 'posts');

    const next = query(postsRef, startAfter(cursor), limit(pointer));
    const nextSnapshots = await getDocs(next);

    setLastVisible(nextSnapshots.docs[nextSnapshots.docs.length - 1]);

    const r = [];
    nextSnapshots.forEach((doc) => {
      r.push(doc.data());
    });

    setReceipes([...recipes, ...r]);
  };

  const fetchPostData = async (pointer) => {
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

    setReceipes(r);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      fetchPostData(POINTER);

      const ops = await getAllDocsInACollection('original posters');
      const p = await getAllDocsInACollection('platforms');
      const t = await getAllDocsInACollection('tags');
      const g = await getAllDocsInACollection('genres');

      setOPs(ops);
      setPlatforms(p);
      setTags(t);
      setGenres(g);
    };

    fetchAllData();
  }, []);

  return recipes.length ? (
    <styles.Container>
      <Hero
        total={totalRecipes}
        platforms={platforms.length}
        ops={ops.length}
        tags={tags.length}
        funMode={funMode}
      />
      <styles.ShowContainer>
        <P as="label" htmlFor="showFilterSort">
          show filter/sort options
        </P>
        <input
          onChange={() => {
            return setShowFilterSet(!showFilterSort);
          }}
          type="checkbox"
          name="showFilterSort"
          id="showFilterSort"
          checked={showFilterSort}
        />
      </styles.ShowContainer>
      {showFilterSort ? (
        <FilterSortSettings
          setFunMode={setFunMode}
          funMode={funMode}
          platforms={platforms}
          ops={ops}
          tags={tags}
          genres={genres}
          handleFilterSort={handleFilterSort}
        />
      ) : null}

      <styles.Grid>
        {recipes.map((recipe) => {
          return (
            <Recipe
              key={recipe.link}
              recipe={recipe}
              funMode={funMode}
              handleAddToFavorites={handleAddToFavorites}
            />
          );
        })}

        {POINTER < totalRecipes ? (
          <FlexContainer items="center" justify="center">
            <Button
              clickHandler={() => {
                loadMoreData(lastVisible, POINTER);
              }}
            >
              load more
            </Button>
          </FlexContainer>
        ) : null}
      </styles.Grid>
      <Toaster
        toastOptions={{
          className: 'toaster',
          style: {
            border: '1px solid black',
            padding: '16px',
            borderRadius: '0',
            color: 'black',
            fontSize: '16px'
          }
        }}
      />
    </styles.Container>
  ) : (
    <Loading />
  );
};
AbletonRecipes.propTypes = {};

export default AbletonRecipes;
