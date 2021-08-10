import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "styles/theme";
import { anchorColor } from "styles/utilities";
import { remHelper } from "utils";

const StyledLink = styled(Link)`
  text-decoration: underline;

  ${anchorColor({
    color: (props) => props && theme.light[props.themeColor],
  })};
`;

const StyledSpan = styled.span`
  font-size: ${remHelper[16]};
`;

const GoHomeBack = ({ themeColor, destination, cta, className }) => {
  return (
    <StyledLink to={destination} themeColor={themeColor} className={className}>
      <StyledSpan>{cta}</StyledSpan>
    </StyledLink>
  );
};

export default GoHomeBack;
