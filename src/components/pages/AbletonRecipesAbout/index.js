import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FlexContainer, H1 } from 'styles/elements';
import {
  checkDocumentExistenceById,
  getDocumentById
} from 'utils/firebaseHelpers';
import { auth } from 'utils/firestore';
import { UserContext } from '../AbletonRecipes/context.js';
import Header from '../AbletonRecipes/Header';

const Container = styled.div`
  * {
    font-family: 'arial' !important;
  }
  max-width: 640px;
`;

const AbletonRecipesAbout = () => {
  const [user, setUser] = useState(null);

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
      }
    });
  }, []);

  return (
    <UserContext.Provider value={value}>
      <Header />
      <FlexContainer justify="center" items="center">
        <Container>
          <H1 textAlign="center">It's a recipes website for ableton</H1>
        </Container>
      </FlexContainer>
    </UserContext.Provider>
  );
};

AbletonRecipesAbout.propTypes = {};

export default AbletonRecipesAbout;
