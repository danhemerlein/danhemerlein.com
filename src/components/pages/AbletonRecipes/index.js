import { data } from 'data/ableton-receipes-seed.js';
import { Grid } from 'styles/elements';
import Recipe from './Recipe';

const AbletonRecipes = () => {
  console.log(data);
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
