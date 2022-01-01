import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';

const StyledFlexContainer = styled(FlexContainer)`
  min-height: 22px;
`;

const Footer = () => {
  return (
    <StyledFlexContainer as="footer" items="center" justify="flex-end">
      <P as="small">© Dan Hemerlein 2022</P>
    </StyledFlexContainer>
  );
};

export default Footer;
