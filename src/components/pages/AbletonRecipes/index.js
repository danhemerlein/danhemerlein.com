import Button from 'components/base/Button';
import { useEffect, useMemo, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { FlexContainer, P } from 'styles/elements';
import {
  checkDocumentExistenceById,
  getAllDocsInACollection,
  getDocumentById,
  handleAddToFavorites,
  handleRemoveFromFavories
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
  const [types, setTypes] = useState([]);
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
      const ty = await getAllDocsInACollection('types');

      setOPs(ops);
      setPlatforms(p);
      setTags(t);
      setGenres(g);
      setTypes(ty);
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

  return (
    <UserContext.Provider value={value}>
      <styles.Container>
        <Header />
        <Hero total={totalRecipes} funMode={funMode} />
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
            types={types}
            setFilterError={setFilterError}
            setRecipes={setRecipes}
            pointer={POINTER}
            handleFilterSort={handleFilterSort}
          />
        ) : null}

        {filterError ? (
          <P textAlign="center">No results found, adjust the filter settings</P>
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
                    return handleAddToFavorites(user, recipe.id, recipe.name);
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
