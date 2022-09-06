import { data } from 'data/ableton-receipes-seed.js';
import { useState } from 'react';
import styled from 'styled-components';
import { remHelper } from 'utils/remHelper';
import FilterSortSettings from './FilterSortSettings';
import Hero from './Hero';
import Recipe from './Recipe';

const Grid = styled.div`
  max-width: 640px;
  margin: ${remHelper[16]} auto 0 auto;
`;

const AbletonRecipes = () => {
  const [funMode, setFunMode] = useState(false);

  return (
    <>
      <Hero total={data.length} />
      <FilterSortSettings />
      <Grid>
        {data.map((recipe) => {
          return <Recipe recipe={recipe} />;
        })}
      </Grid>
    </>
  );
};
AbletonRecipes.propTypes = {};

export default AbletonRecipes;
