import Button from 'components/base/Button';
import Loading from 'components/other/Loading';
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FlexContainer, P } from 'styles/elements';
import { firestore } from 'utils/firestore';
import { renderUniqueForRecipes } from 'utils/lib';
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

  const POINTER = 2;

  const handleAddToFavorites = () => {
    return toast('you must log in to use this feature');
  };

  const handleFilterSort = (values) => {
    console.log('handing filter sort', values);
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

  const fetchData = async (pointer) => {
    const postsRef = collection(firestore, 'posts');

    const q2 = query(postsRef);
    const totalSnapshot = await getDocs(q2);
    setTotalRecipes(totalSnapshot.size);

    const first = query(postsRef, limit(pointer));
    const snapshot = await getDocs(first);
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);

    const r = [];
    snapshot.forEach((doc) => {
      r.push(doc.data());
    });

    setReceipes(r);
  };

  useEffect(() => {
    fetchData(POINTER);

    const p = recipes.map((item) => {
      return item.platform;
    });

    const op = recipes.map((item) => {
      return item['original poster'];
    });

    const t = recipes.map((item) => {
      return item.Tags.split(',');
    });

    const g = recipes.map((item) => {
      return item.genre.split(',');
    });

    setOPs(renderUniqueForRecipes(op));
    setPlatforms(renderUniqueForRecipes(p));
    setTags(renderUniqueForRecipes(t));
    setGenres(renderUniqueForRecipes(g));
  }, []);

  return recipes.length ? (
    <styles.Container>
      <Hero
        total={recipes.length}
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
