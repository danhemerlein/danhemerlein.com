import styled from 'styled-components';
import { FlexContainer } from 'styles/elements/containers';
import { P, StyledLink } from 'styles/elements/typography';

const StyledFlexContainer = styled(FlexContainer)`
  min-height: 22px;
`;

const Footer = () => (
  <StyledFlexContainer as="footer" items="center" justify="space-between">
    <P as="small">
      <StyledLink to="/site-map">site map</StyledLink>
    </P>
    <P as="small">© Dan Hemerlein {new Date().getFullYear()}</P>
  </StyledFlexContainer>
);

export default Footer;
