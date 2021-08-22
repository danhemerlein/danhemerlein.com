import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { above, anchorColor } from 'styles/utilities';
import { remHelper } from 'utils';

const Container = styled(FlexContainer)`
  margin-top: ${remHelper[16]};

  ${above.desktop`
    margin-top: 0;
  `}
`;

const StyledP = styled(P)`
  margin-bottom: ${remHelper[8]};
`;

const StyledA = styled.a`
  ${({ theme }) => {
    return anchorColor({
      color: theme.foreground,
      textDecoration: 'underline',
    });
  }}
`;

const ProjectDetails = ({ project }) => {
  const { artistWebsite, artist, title, releaseDate, role } = project.fields;

  const renderArtistATag = () => {
    if (artistWebsite !== undefined) {
      return (
        <P white>
          by&nbsp;
          <StyledA
            href={artistWebsite}
            target="_blank"
            rel="noopener noreferrer"
          >
            {artist}
          </StyledA>
        </P>
      );
    }
    return <P white>by&nbsp;{artist}</P>;
  };

  return (
    <FlexContainer justify="space-between" items="center">
      <Container direction="column">
        <StyledP white>{title}</StyledP>
        {renderArtistATag()}
      </Container>

      <Container direction="column">
        <StyledP lowecase textRight white>
          {releaseDate.replace(',', '')}
        </StyledP>

        <P lowercase textRight white>
          {role}
        </P>
      </Container>
    </FlexContainer>
  );
};

export default ProjectDetails;
