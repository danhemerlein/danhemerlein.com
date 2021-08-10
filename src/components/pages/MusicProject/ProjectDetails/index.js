import styled from "styled-components";
import { FlexContainer, P } from "styles/elements";
import theme from "styles/theme";
import { above, anchorColor } from "styles/utilities";
import { remHelper } from "utils";

const TitleContainer = styled(FlexContainer)`
  margin-top: ${remHelper[16]};

  ${above.desktop`
    margin-top: 0;
  `}
`;

const DateContainer = styled(FlexContainer)`
  margin-top: ${remHelper[16]};
  width: 50%;

  ${above.desktop`
    margin-top: 0;
  `}
`;

const ReleaseDate = styled(P)`
  margin-bottom: ${remHelper[8]};
`;

const Title = styled(P)`
  margin-bottom: ${remHelper[8]};
`;

const StyledA = styled.a`
  ${anchorColor({
    color: theme.light.background,
  })};
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
      <TitleContainer direction="column">
        <Title white>{title}</Title>
        {renderArtistATag()}
      </TitleContainer>

      <DateContainer direction="column">
        <ReleaseDate lowecase textRight white>
          {releaseDate.replace(",", "")}
        </ReleaseDate>

        <P lowercase textRight white>
          {role}
        </P>
      </DateContainer>
    </FlexContainer>
  );
};

export default ProjectDetails;
