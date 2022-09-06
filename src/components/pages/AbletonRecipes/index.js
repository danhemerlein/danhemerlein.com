import Button from 'components/base/Button';
import Loading from 'components/other/Loading';
import { data } from 'data/ableton-receipes-seed.js';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { remHelper } from 'utils/remHelper';
import FilterSortSettings from './FilterSortSettings';
import Hero from './Hero';
import Recipe from './Recipe';

const Grid = styled.div`
  max-width: 640px;
  margin: ${remHelper[16]} auto 0 auto;

  * {
    font-family: 'arial';
  }
`;

const LoadMoreContainer = styled(FlexContainer)``;

const AbletonRecipes = () => {
  const [funMode, setFunMode] = useState(false);
  const [recipes, setReceipes] = useState([]);
  let [pointer, setPointer] = useState(2);

  useEffect(() => {
    setReceipes(data.slice(0, pointer));
  }, [recipes, pointer]);

  return recipes.length ? (
    <>
      <Hero total={data.length} />
      <FilterSortSettings setFunMode={setFunMode} funMode={funMode} />
      <Grid>
        {recipes.map((recipe) => {
          return <Recipe recipe={recipe} funMode={funMode} />;
        })}

        {pointer < data.length ? (
          <LoadMoreContainer items="center" justify="center">
            <Button
              clickHandler={() => {
                return setPointer((pointer += 2));
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
