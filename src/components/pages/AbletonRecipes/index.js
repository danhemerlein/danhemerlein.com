import Button from 'components/base/Button';
import Loading from 'components/other/Loading';
import { data } from 'data/ableton-receipes-seed.js';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { renderUniqueForRecipes } from 'utils/lib';
import { remHelper } from 'utils/remHelper';
import FilterSortSettings from './FilterSortSettings';
import Hero from './Hero';
import Recipe from './Recipe';

const Container = styled.div`
  * {
    font-family: 'arial' !important;
  }
`;

const Grid = styled.div`
  max-width: 640px;
  margin: ${remHelper[16]} auto 0 auto;
`;

const ShowContainer = styled(P)`
  margin-top: ${remHelper[16]};
  label {
    cursor: pointer;
  }
`;

const LoadMoreContainer = styled(FlexContainer)``;

const AbletonRecipes = () => {
  const [funMode, setFunMode] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const [ops, setOPs] = useState([]);
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  let [pointer, setPointer] = useState(2);
  const [showFilterSort, setShowFilterSet] = useState(true);
  const [recipes, setReceipes] = useState(data.slice(0, pointer));

  const handleAddToFavorites = () => {
    return toast('you must log in to use this feature');
  };

  const handleFilterSort = (values) => {
    console.log('handing filter sort', values);
  };

  useEffect(() => {
    const p = data.map((item) => {
      return item.platform;
    });

    const op = data.map((item) => {
      return item['original poster'];
    });

    const t = data.map((item) => {
      return item.Tags.split(',');
    });

    const g = data.map((item) => {
      return item.genre.split(',');
    });

    setOPs(renderUniqueForRecipes(op));
    setPlatforms(renderUniqueForRecipes(p));
    setTags(renderUniqueForRecipes(t));
    setGenres(renderUniqueForRecipes(g));
  }, [recipes, pointer]);

  return recipes.length ? (
    <Container>
      <Hero
        total={data.length}
        platforms={platforms.length}
        ops={ops.length}
        tags={tags.length}
        funMode={funMode}
      />
      <ShowContainer>
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
      </ShowContainer>
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

      <Grid>
        {recipes.map((recipe) => {
          return (
            <Recipe
              recipe={recipe}
              funMode={funMode}
              handleAddToFavorites={handleAddToFavorites}
            />
          );
        })}

        {pointer < data.length ? (
          <LoadMoreContainer items="center" justify="center">
            <Button
              clickHandler={() => {
                setPointer((pointer += 2));
                setReceipes(data.slice(0, pointer));
              }}
            >
              load more
            </Button>
          </LoadMoreContainer>
        ) : null}
      </Grid>
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
    </Container>
  ) : (
    <Loading />
  );
};
AbletonRecipes.propTypes = {};

export default AbletonRecipes;
