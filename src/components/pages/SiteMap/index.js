import FullScreenHeight from 'components/other/FullScreenHeight';
import Loading from 'components/other/Loading';
import { arrayOf, bool } from 'prop-types';
import { musicProjectPropTypes } from 'propTypes';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FlexContainer, H1, P, StyledLink } from 'styles/elements';
import { basePageTitle } from 'utils/constants/lib';
import data from 'utils/navigation/data';
import { remHelper } from 'utils/remHelper';

const StyledHeadline = styled(H1)`
  margin-bottom: ${remHelper[8]};
`;

const ListItem = styled(P)`
  margin-bottom: ${remHelper[8]};
  width: 100%;
  color: ${({ theme }) => theme.foreground};
`;

const SiteMap = ({ musicProjectsLoading, musicProjects }) => {
  const content = musicProjects.length;

  useEffect(() => {
    document.title = `${basePageTitle} - site map`;
  }, []);

  if (musicProjectsLoading === false && !content) {
    return null;
  }

  if (musicProjectsLoading === true && !content) {
    return <Loading />;
  }

  return (
    <FullScreenHeight
      unsetBreakpoint="desktop"
      justify="flex"
      items="flex-start"
    >
      <FlexContainer direction="column">
        <StyledHeadline>site map:</StyledHeadline>

        <nav role="navigation">
          <FlexContainer
            as="ul"
            items="center"
            justify="center"
            direction="column"
          >
            {data.topNavLinks.map((link) => {
              return (
                <ListItem as="li" key={link.title}>
                  <StyledLink to={link.to}>{link.title}</StyledLink>
                </ListItem>
              );
            })}

            {musicProjects.map((project) => {
              const { title, handle, artist } = project.fields;

              return (
                <ListItem as="li" key={title}>
                  <StyledLink to={`/music/${handle}/`}>
                    {title} by {artist}
                  </StyledLink>
                </ListItem>
              );
            })}
          </FlexContainer>
        </nav>
      </FlexContainer>
    </FullScreenHeight>
  );
};

const mapStateToProps = (state) => {
  return {
    musicProjectsLoading: state.musicProjects.loading,
    musicProjects: state.musicProjects.all
  };
};

SiteMap.propTypes = {
  musicProjectsLoading: bool.isRequired,
  musicProjects: arrayOf(musicProjectPropTypes).isRequired
};

export default connect(mapStateToProps)(SiteMap);
