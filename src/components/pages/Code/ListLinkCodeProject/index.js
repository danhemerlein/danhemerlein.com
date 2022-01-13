import { codeProjectPropTypes } from 'propTypes';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { above } from 'styles/utilities/breakpoints';
import { remHelper } from 'utils/remHelper';

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
  color: ${({ theme }) => theme.foreground};

  &:visited {
    color: ${({ theme }) => theme.foreground};
  }
`;

const ListLinkCodeProject = ({ project }) => {
  const { link, title } = project.fields;
  return (
    <ListLink>
      <Inner>
        <StyledAnchor href={link} target="_blank" rel="noopener noreferrer">
          <P>{title}</P>
        </StyledAnchor>
      </Inner>
    </ListLink>
  );
};

ListLinkCodeProject.propTypes = {
  project: codeProjectPropTypes.isRequired
};

export default ListLinkCodeProject;
