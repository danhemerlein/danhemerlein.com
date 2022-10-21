import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import styled from 'styled-components';
import { A, FlexContainer, H1, H2, P } from 'styles/elements';
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

  blockquote {
    width: 75%;
  }
`;

const Stats = styled(FlexContainer)`
  margin: ${remHelper[8]} 0;
`;

const Paragraph = styled(P)`
  width: 100%;
  margin: ${remHelper[8]} 0;
`;

const TwitterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: ${remHelper[16]};
  row-gap: ${remHelper[16]};
`;

const StyledH2 = styled(H2)`
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
        <Inner justify="center" direction="column">
          <H1 textAlign="center">it's a recipes website for ableton live</H1>
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
          </Paragraph>
          <Paragraph>
            Ableton Recipes is a passion project created by{' '}
            <Link to="/">Dan Hemerlein</Link> — coded and maintained with love
            in Brooklyn, New York.
          </Paragraph>
          <Paragraph bold italic>
            why did i make this?
          </Paragraph>
          <Paragraph>
            I built Ableton Recipes because it's the online resources/learning
            tool for Live that I always wish existed. The ethos behind this tool
            is captured well in the following post I found on&nbsp;
            <a
              href="https://www.are.na/block/16481902"
              target="_blank"
              rel="noreferrer"
            >
              are.na
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
            the footprints of your life adding up to?"
          </Paragraph>

          <Paragraph>
            When I started learning Ableton, I found myself constantly ‘writing
            it down’ in the form of bookmarking tweets and saving instagram
            posts to collections. But I would rarely return to that content when
            I was actually sitting down to produce music. If I did return to
            those posts, I would have to open instagram and click through a
            bunch of UI just to find a 15 second post that <em>might</em> inform
            what I was working on. This process was slow and had many
            opportunities for me to bounce and lose focus on the task at hand:
            making dope music.
          </Paragraph>

          <Paragraph>
            Here's a great twitter thread of others 'writing it down' in public:
          </Paragraph>

          <TwitterTweetEmbed tweetId="1580207543087136768" />

          <Paragraph>
            Ableton Recipes aims to be the place that has the ableton tips. This
            index attempts to de-couple and contextualize the content contained
            herein so site visitors can start applying the learnings from this
            content with ease and speed.
          </Paragraph>

          <Paragraph bold italic>
            what's next?
          </Paragraph>

          <Paragraph>
            For now, I'm building this in the open. I'm trying to add new
            content all the time and share the site with trusted friends for
            contructive feedback.
          </Paragraph>

          <Paragraph>
            Below are a few tweets and blog posts I've read that have really
            kept me going while building this.
          </Paragraph>

          <StyledH2 textAlign="left">
            <A
              href="https://www.robinsloan.com/notes/home-cooked-app/"
              target="_blank"
            >
              An app can be a home-cooked meal by Robin Sloan
            </A>
          </StyledH2>

          <TwitterGrid>
            <TwitterTweetEmbed tweetId="1582756731494739969" />
            <TwitterTweetEmbed tweetId="1580279730737008641" />
          </TwitterGrid>

          <Paragraph>Thanks for being here.</Paragraph>
        </Inner>
      </Container>
    </UserContext.Provider>
  );
};

AbletonRecipesAbout.propTypes = {};

export default AbletonRecipesAbout;
