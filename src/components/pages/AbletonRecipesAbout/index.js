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
          <Paragraph as="blockquote">
            "At this point, we’ve gotten really great at “writing it down” We’ve
            been trained to take notes, snag photos, and add things to our
            bookmarks so we don’t forget about them. The more important question
            that nobody has bothered to ask is what to do with it all.
            Components are ultimately the building blocks of a story, project,
            or idea, but accumulation means nothing without connection. What are
            the footprints of your life adding up to?""
          </Paragraph>
          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              airbnb has no houses
              <br />
              uber has no cars
              <br />
              you have limitless information with no context or meaning
              whatsoever
              <br />
              this is the new economy
            </p>
            &mdash; dn hmrln (@danhemerlein){' '}
            <a href="https://twitter.com/danhemerlein/status/1507392088748474369?ref_src=twsrc%5Etfw">
              March 25, 2022
            </a>
          </blockquote>{' '}
          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              how do i use my skills as a coder for good in the world?
            </p>
            &mdash; dn hmrln (@danhemerlein){' '}
            <a href="https://twitter.com/danhemerlein/status/1495567611614142464?ref_src=twsrc%5Etfw">
              February 21, 2022
            </a>
          </blockquote>{' '}
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charset="utf-8"
          />
        </Inner>
      </Container>
    </UserContext.Provider>
  );
};

AbletonRecipesAbout.propTypes = {};

export default AbletonRecipesAbout;
