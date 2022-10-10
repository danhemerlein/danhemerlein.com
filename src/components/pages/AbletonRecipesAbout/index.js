import { useEffect, useMemo, useState } from 'react';

import styled from 'styled-components';
import { FlexContainer, H1, P } from 'styles/elements';
import {
  checkDocumentExistenceById,
  getAllDocsInACollection,
  getDocumentById
} from 'utils/firebaseHelpers';
import { auth } from 'utils/firestore';
import { UserContext } from '../AbletonRecipes/context.js';
import Header from '../AbletonRecipes/Header';

const Container = styled.div`
  * {
    font-family: 'arial' !important;
  }
`;
const Inner = styled(FlexContainer)`
  max-width: 640px;
  margin: 0 auto;
`;

const AbletonRecipesAbout = () => {
  const [user, setUser] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [ops, setOPs] = useState([]);
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [posts, setPosts] = useState([]);

  const value = useMemo(() => {
    return { user, setUser };
  }, [user]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const userExists = await checkDocumentExistenceById('users', user.uid);

      const os = await getAllDocsInACollection('original posters');
      const p = await getAllDocsInACollection('platforms');
      const t = await getAllDocsInACollection('tags');
      const g = await getAllDocsInACollection('genres');
      const pts = await getAllDocsInACollection('posts');

      setOPs(os);
      setPlatforms(p);
      setTags(t);
      setGenres(g);
      setPosts(pts);

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
      <Container>
        <Header />
        <Inner justify="center" items="center" direction="column">
          <H1 textAlign="center">It's a recipes website for ableton</H1>

          {posts.length &&
          ops.length &&
          platforms.length &&
          tags.length &&
          genres.length ? (
            <FlexContainer justify="center" items="center" direction="column">
              <P>{posts.length} tips to browse</P>
              <P>
                from {ops.length} sources on {platforms.length} platforms
                covering {genres.length} genres
              </P>
              <P>bespoke tagging system with {tags.length} tags</P>
            </FlexContainer>
          ) : (
            <P>database stats loading...</P>
          )}
        </Inner>
      </Container>
    </UserContext.Provider>
  );
};

AbletonRecipesAbout.propTypes = {};

export default AbletonRecipesAbout;
