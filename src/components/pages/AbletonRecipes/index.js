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
import Header from './Header';
import Hero from './Hero';
import Recipe from './Recipe';

const AbletonRecipes = () => {
  const [funMode, setFunMode] = useState(false);
  const [gridLayout, setGridLayout] = useState('4x');
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
  const [filterValues, setFilterValues] = useState({});

  const POINTER = 12;

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

    document.querySelector('html').classList.add('ableton-recipes');
  }, []);

  const [user, setUser] = useState(null);

  const value = useMemo(() => {
    return { user, setUser };
  }, [user]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      let userExists;
      if (user) {
        userExists = await checkDocumentExistenceById('users', user?.uid);
      } else {
        setUser(null);
      }

      if (userExists) {
        const u = await getDocumentById('users', user?.uid);

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
          <FlexContainer items="center">
            <P as="label" bold htmlFor="showFilterSort">
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
          </FlexContainer>

          <FlexContainer>
            <P bold>grid:&nbsp;&nbsp;</P>

            <styles.RadioContainer
              id="4x-container"
              justify="center"
              items="center"
            >
              <P bold as="label" htmlFor="gridLayout">
                4x
              </P>
              <input
                onChange={() => {
                  return setGridLayout('4x');
                }}
                type="radio"
                name="gridLayout"
                checked={gridLayout === '4x'}
                id="4x"
              />
            </styles.RadioContainer>

            <styles.RadioContainer justify="center" items="center">
              <P bold as="label" htmlFor="gridLayout">
                2x
              </P>
              <input
                onChange={() => {
                  return setGridLayout('2x');
                }}
                type="radio"
                checked={gridLayout === '2x'}
                name="gridLayout"
                id="2x"
              />
            </styles.RadioContainer>

            <styles.RadioContainer justify="center" items="center">
              <P bold as="label" htmlFor="gridLayout">
                1x
              </P>
              <input
                onChange={() => {
                  return setGridLayout('1x');
                }}
                type="radio"
                name="gridLayout"
                id="1x"
              />
            </styles.RadioContainer>
          </FlexContainer>

          <FlexContainer items="center">
            <P bold as="label" htmlFor="funMode">
              fun mode
            </P>
            <input
              onChange={() => {
                return setFunMode(!funMode);
              }}
              type="checkbox"
              name="funMode"
              id="funMode"
              checked={funMode}
            />
          </FlexContainer>
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
            setFilterValues={setFilterValues}
            pointer={POINTER}
            handleFilterSort={handleFilterSort}
          />
        ) : null}

        {filterError ? (
          <P textAlign="center">No results found, adjust the filter settings</P>
        ) : null}

        {recipes.length && !filterError ? (
          <>
            <styles.Grid gridLayout={gridLayout}>
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
            </styles.Grid>
            {POINTER < totalRecipes ? (
              <styles.LoadMoreButtonContainer items="center" justify="center">
                <Button
                  clickHandler={() => {
                    loadMoreData(
                      lastVisible,
                      POINTER,
                      recipes,
                      setLastVisible,
                      setRecipes,
                      filterValues
                    );
                  }}
                >
                  load more
                </Button>
              </styles.LoadMoreButtonContainer>
            ) : null}
          </>
        ) : null}

        <Toaster
          toastOptions={{
            className: 'toaster',
            style: {
              border: '1px solid',
              borderColor: `${filterError ? 'red' : 'black'}`,
              wordBreak: 'break-word',
              padding: '16px',
              borderRadius: '0',
              color: `${filterError ? 'red' : 'black'}`,
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
