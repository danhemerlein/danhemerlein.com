import { useEffect, useMemo, useState } from 'react';
import {
  checkDocumentExistenceById,
  getDocumentById
} from 'utils/firebaseHelpers';
import { auth } from 'utils/firestore';
import { UserContext } from '../AbletonRecipes/context.js';
import { fetchLikedPostsByUser } from '../AbletonRecipes/firebaseHelpers.js';
import Header from '../AbletonRecipes/Header';
import Recipe from '../AbletonRecipes/Recipe/index.js';
import SubscriberCheck from '../AbletonRecipes/SubscriberCheck';
import * as styles from './AbletonRecipesDashboard.styles';

const AbletonRecipesDashboard = () => {
  const [user, setUser] = useState(null);
  const [likedRecipes, setLikedRecipes] = useState([]);

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

        const hearts = await fetchLikedPostsByUser(user?.uid);

        const likes = hearts.map(async (heart) => {
          const docs = await getDocumentById('posts', heart);
          return docs;
        });

        Promise.all(likes).then((d) => {
          setLikedRecipes(d);
        });

        console.log(likedRecipes);
      }
    });
  }, []);
  return (
    <UserContext.Provider value={value}>
      <SubscriberCheck>
        <styles.Container>
          <Header />

          {likedRecipes.length ? (
            <styles.Grid>
              {likedRecipes.map((recipe) => {
                return (
                  <Recipe
                    key={recipe.link}
                    recipe={recipe}
                    funMode={false}
                    // handleAddToFavorites={() => {
                    //   return handleAddToFavorites(user, recipe.uid, recipe.name);
                    // }}
                    // handleRemoveFromFavories={handleRemoveFromFavories}
                  />
                );
              })}
            </styles.Grid>
          ) : null}
        </styles.Container>
      </SubscriberCheck>
    </UserContext.Provider>
  );
};

AbletonRecipesDashboard.propTypes = {};

export default AbletonRecipesDashboard;
