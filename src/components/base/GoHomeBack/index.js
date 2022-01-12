import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { anchorColor } from 'styles/utilities/mixins';
import { remHelper } from 'utils/remHelper';

const StyledLink = styled(Link)`
  text-decoration: underline;

  ${({ theme }) =>
    anchorColor({
      color: theme.anchor,
    })}
`;

const StyledSpan = styled.span`
  font-size: ${remHelper[16]};
`;

const GoHomeBack = ({ destination, cta, className }) => (
  <StyledLink to={destination} className={className}>
    <StyledSpan>{cta}</StyledSpan>
  </StyledLink>
);

GoHomeBack.propTypes = {
  destination: string.isRequired,
  cta: string.isRequired,
  className: string,
};

GoHomeBack.defaultProps = {
  className: '',
};

export default GoHomeBack;
