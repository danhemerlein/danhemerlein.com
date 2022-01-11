import FullScreenHeight from 'components/other/FullScreenHeight';
import { arrayOf, bool } from 'prop-types';
import { musicProjectPropTypes } from 'propTypes';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FlexContainer, H1, P, StyledLink } from 'styles/elements';
import { basePageTitle, remHelper } from 'utils';
import data from 'utils/navigation/data';

const StyledHeadline = styled(H1)`
  margin-bottom: ${remHelper[8]};
`;

const ListItem = styled(P)`
  margin-bottom: ${remHelper[16]};
  width: 100%;
  color: ${({ theme }) => theme.foreground};
`;

const SiteMap = ({ musicProjectsLoading, musicProjects }) => {
  useEffect(() => {
    document.title = `${basePageTitle} - site map`;
  }, []);

  return (
    <>
      <FullScreenHeight
        unsetBreakpoint="none"
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
            </FlexContainer>
          </nav>
        </FlexContainer>
      </FullScreenHeight>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    musicProjectsLoading: state.musicProjects.loading,
    musicProjects: state.musicProjects.activeProjects,
  };
};

SiteMap.propTypes = {
  musicProjectsLoading: bool.isRequired,
  musicProjects: arrayOf(musicProjectPropTypes).isRequired,
};

export default connect(mapStateToProps)(SiteMap);
