import { useThemeContext } from "context/ThemeContext";
import styled from "styled-components";
import { FlexContainer, P } from "styles/elements";
import { above } from "styles/utilities";
import { remHelper } from "utils";

const ListLink = styled.div`
  width: 100%;
  margin-bottom: ${remHelper[16]};
  padding: 0 ${remHelper[16]};

  ${above.tablet`
    width: 50%;
    padding: 0;
  `}
`;

const Inner = styled(FlexContainer)`
  ${above.tablet`
    justify-content: center;
  `}
`;

const StyledAnchor = styled.a`
  text-decoration: underline;
  text-align: center;
  color: ${({ theme, $mode }) => theme[$mode].foreground};

  &:visited {
    color: ${({ theme, $mode }) => theme[$mode].foreground};
  }
`;

const ListLinkCodeProject = ({ project }) => {
  const { link, title } = project.fields;
  const mode = useThemeContext();
  return (
    <ListLink>
      <Inner>
        <StyledAnchor
          $mode={mode}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <P>{title}</P>
        </StyledAnchor>
      </Inner>
    </ListLink>
  );
};

export default ListLinkCodeProject;
