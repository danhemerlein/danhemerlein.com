import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FlexContainer, H1, P } from 'styles/elements';
import {
  checkDocumentExistenceById,
  getAllDocsInACollection,
  getDocumentById
} from 'utils/firebaseHelpers';
import { auth } from 'utils/firestore';
import { remHelper } from 'utils/remHelper';
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

const Stats = styled(FlexContainer)`
  margin: ${remHelper[8]} 0;
`;

const Paragraph = styled(P)`
  width: 100%;
  margin: ${remHelper[8]} 0;
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
          <H1 textAlign="center">It's a recipes website for ableton live</H1>
          {posts.length &&
          ops.length &&
          platforms.length &&
          tags.length &&
          genres.length ? (
            <Stats justify="center" items="center" direction="column">
              <P>{posts.length} browsable recipes</P>
              <P>
                from {ops.length} sources on {platforms.length} platforms
              </P>
              <P>covering {genres.length} genres</P>
              <P> {tags.length} bespoke tags</P>
            </Stats>
          ) : (
            <P>database stats loading...</P>
          )}
          <Paragraph bold italic>
            what is ableton recipes?
          </Paragraph>

          <Paragraph>
            Ableton Recipes is an online index of ableton live resources. It
            contains links to social media posts, sample packs, plugins/devices,
            documentation, tutorials and more. Ableton Recipes seeks compile and
            tag online content from all corners of the internet into one
            searchable database. Use it to learn something new. Use it for
            inspiration while producing. Use it to find new content creators to
            follow. Create an account to save favorite posts for later use.
            Ableton Recipes is a passion project created by Dan Hemerlein, coded
            and maintained with love in Brooklyn, New York.
          </Paragraph>

          <Paragraph bold italic>
            why did i make this?
          </Paragraph>

          <Paragraph>
            The ethos of ableton recipes is captured in the blow quote which I
            originally encounctered as a&nbsp;
            <a
              href="https://www.are.na/block/16481902"
              target="_blank"
              rel="noreferrer"
            >
              post on are.na
            </a>
            &nbsp;from&nbsp;
            <a
              target="_blank"
              href="https://www.are.na/alice-otieno"
              rel="noreferrer"
            >
              Alice Otineo:
            </a>
          </Paragraph>

          <Paragraph bold italic>
            what's next?
          </Paragraph>
        </Inner>
      </Container>
    </UserContext.Provider>
  );
};

AbletonRecipesAbout.propTypes = {};

export default AbletonRecipesAbout;
