import Button from 'components/base/Button';
import { useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FlexContainer, P } from 'styles/elements';
import {
  addDocument,
  checkDocumentExistenceById,
  deleteDocById,
  getAllDocsInACollection,
  getDocumentById,
  updateHeartCount
} from 'utils/firebaseHelpers';
import { auth } from 'utils/firestore';
import { UserContext } from './context.js';
import {
  fetchPostData,
  handleFilterSort,
  loadMoreData
} from './firebaseHelpers';

import * as styles from './AbletonRecipes.styles';
import FilterSortSettings from './FilterSortSettings';
import Header from './Header.js';
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
  const [recipes, setRecipes] = useState([]);
  const [lastVisible, setLastVisible] = useState({});
  const [filterError, setFilterError] = useState(false);

  const POINTER = 10;

  useEffect(() => {
    const fetchAllData = async () => {
      fetchPostData(POINTER, setTotalRecipes, setLastVisible, setRecipes);

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

  const [user, setUser] = useState(null);

  const value = useMemo(() => {
    return { user, setUser };
  }, [user]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const userExists = await checkDocumentExistenceById('users', user.uid);

      if (userExists) {
        const u = await getDocumentById('users', user.uid);

        setUser({
          uid: u.uid,
          email: u.email,
          name: u.name,
          roles: {
            subscriber: u.roles.subscriber,
            admin: u.roles.admin
          }
        });
      }
    });
  }, []);

  const handleAddToFavorites = (user, recipeUid, recipeName) => {
    if (!user.uid.length) {
      return toast('you must log in to use this feature');
    }
    const data = {
      id: `${user.uid}-${recipeUid}`,
      userUid: user.uid,
      postUid: recipeUid
    };

    updateHeartCount(recipeUid, 'increment');

    addDocument('hearts', data);
    toast(`liked ${recipeName}`);
  };

  const handleRemoveFromFavories = (user, heartId, recipeUid) => {
    if (!user.uid.length) {
      return toast('you must log in to use this feature');
    }

    deleteDocById('hearts', heartId);
    updateHeartCount(recipeUid, 'decrement');

    toast('unliked successfully');
  };

  return (
    <UserContext.Provider value={value}>
      <styles.Container>
        <Header />
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
            setFilterError={setFilterError}
            setRecipes={setRecipes}
            pointer={POINTER}
            handleFilterSort={handleFilterSort}
          />
        ) : null}

        {filterError ? (
          <P>No results found, adjust the filter settings</P>
        ) : null}

        {recipes.length && !filterError ? (
          <styles.Grid>
            {recipes.map((recipe) => {
              return (
                <Recipe
                  key={recipe.link}
                  recipe={recipe}
                  funMode={funMode}
                  handleAddToFavorites={() => {
                    return handleAddToFavorites(user, recipe.uid, recipe.name);
                  }}
                  handleRemoveFromFavories={handleRemoveFromFavories}
                />
              );
            })}

            {POINTER < totalRecipes ? (
              <FlexContainer items="center" justify="center">
                <Button
                  clickHandler={() => {
                    loadMoreData(
                      lastVisible,
                      POINTER,
                      recipes,
                      setLastVisible,
                      setRecipes
                    );
                  }}
                >
                  load more
                </Button>
              </FlexContainer>
            ) : null}
          </styles.Grid>
        ) : null}

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
    </UserContext.Provider>
  );
};

AbletonRecipes.propTypes = {};

export default AbletonRecipes;
