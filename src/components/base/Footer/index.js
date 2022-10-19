import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FlexContainer, P, StyledLink } from 'styles/elements';

const StyledFlexContainer = styled(FlexContainer)`
  min-height: 22px;
`;

const Footer = () => {
  const [isExperiment, setIsExperiment] = useState(false);
  useEffect(() => {
    setIsExperiment(window.location.pathname.includes('/experiments/'));
  }, []);

  return (
    <StyledFlexContainer
      as="footer"
      items="center"
      justify={!isExperiment ? 'space-between' : 'flex-end'}
    >
      {!isExperiment ? (
        <P as="small">
          <StyledLink to="/site-map">site map</StyledLink>
        </P>
      ) : null}
      <P as="small">© Dan Hemerlein {new Date().getFullYear()}</P>
    </StyledFlexContainer>
  );
};

export default Footer;
