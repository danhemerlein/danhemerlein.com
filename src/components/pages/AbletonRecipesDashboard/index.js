import { useEffect, useMemo, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { H1, P } from 'styles/elements';
import {
  checkDocumentExistenceById,
  getDocumentById,
  handleRemoveFromFavories
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
      }
    });
  }, [likedRecipes]);
  return (
    <UserContext.Provider value={value}>
      <SubscriberCheck>
        <styles.Container>
          <Header />
          <H1 textAlign="center">below are posts you've saved</H1>

          {likedRecipes.length ? (
            <styles.Grid>
              {likedRecipes.map((recipe) => {
                return (
                  <Recipe
                    key={recipe.link}
                    recipe={recipe}
                    funMode={false}
                    handleRemoveFromFavories={handleRemoveFromFavories}
                  />
                );
              })}
            </styles.Grid>
          ) : (
            <P textAlign="center">you have not liked any posts</P>
          )}
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
      </SubscriberCheck>
    </UserContext.Provider>
  );
};

AbletonRecipesDashboard.propTypes = {};

export default AbletonRecipesDashboard;
