import { data } from 'data/ableton-receipes-seed.js';
import styled from 'styled-components';
import Recipe from './Recipe';

const Grid = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

const AbletonRecipes = () => {
  return (
    <Grid>
      {data.map((recipe) => {
        return <Recipe recipe={recipe} />;
      })}
    </Grid>
  );
};
AbletonRecipes.propTypes = {};

export default AbletonRecipes;
