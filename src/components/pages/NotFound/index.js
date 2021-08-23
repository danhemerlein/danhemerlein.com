import NotFoundIcon from 'components/base/icons/NotFound';
import FullScreenHeight from 'components/other/FullScreenHeight';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { anchorColor } from 'styles/utilities';
import { remHelper } from 'utils';

const PageContainer = styled(FlexContainer)`
  height: 50%;
  flex-direction: column;
`;

const StyledNotFoundIcon = styled(NotFoundIcon)`
  height: 100%;
  width: 100%;
`;

const TextContainer = styled.div`
  margin-top: ${remHelper[16]};
`;

const StyledP = styled(P)`
  margin-bottom: ${remHelper[4]};
`;

const StyledLink = styled(Link)`
  font-family: 'custom_serif';

  ${({ theme }) => {
    return anchorColor({
      color: theme.anchor,
    });
  }}

  text-decoration: underline;
`;

const NotFound = () => {
  return (
    <FullScreenHeight unsetBreakpoint="none">
      <PageContainer items="center" justify="center">
        <StyledNotFoundIcon />

        <TextContainer>
          <StyledP textCenter>This is a 404 error</StyledP>
          <StyledP textCenter>Please check the url in your browser</StyledP>
          <StyledP textCenter>
            You might want to&nbsp;
            <StyledLink to="/">return home</StyledLink>
          </StyledP>
        </TextContainer>
      </PageContainer>
    </FullScreenHeight>
  );
};

export default NotFound;
