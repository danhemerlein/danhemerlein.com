import Button from 'components/base/Button';
import Loading from 'components/other/Loading';
import { data } from 'data/ableton-receipes-seed.js';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { renderUniqueForRecipes } from 'utils/lib';
import { remHelper } from 'utils/remHelper';
import FilterSortSettings from './FilterSortSettings';
import Hero from './Hero';
import Recipe from './Recipe';

const Grid = styled.div`
  max-width: 640px;
  margin: ${remHelper[16]} auto 0 auto;

  * {
    font-family: 'arial' !important;
  }
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
    <>
      <Hero
        total={data.length}
        platforms={platforms.length}
        ops={ops.length}
        tags={tags.length}
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
          return <Recipe recipe={recipe} funMode={funMode} />;
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
    </>
  ) : (
    <Loading />
  );
};
AbletonRecipes.propTypes = {};

export default AbletonRecipes;
