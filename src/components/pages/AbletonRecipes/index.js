import Button from 'components/base/Button';
import { useContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { FlexContainer, P } from 'styles/elements';
import { getAllDocsInACollection } from 'utils/firebaseHelpers';
import { UserContext } from './context.js';
import {
  fetchPostData,
  handleAddToFavorites,
  handleFilterSort,
  loadMoreData
} from './firebaseHelpers';

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
  const [recipes, setRecipes] = useState([]);
  const [lastVisible, setLastVisible] = useState({});
  const [filterError, setFilterError] = useState(false);
  const { user } = useContext(UserContext);

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

  console.log(user);
  return (
    <styles.Container>
      <div>
        <P>dis da header now</P>
      </div>
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

      {filterError ? <P>No results found, adjust the filter settings</P> : null}

      {recipes.length && !filterError ? (
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
  );
};

AbletonRecipes.propTypes = {};

export default AbletonRecipes;
