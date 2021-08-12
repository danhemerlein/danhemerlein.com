import { H2 } from "styles/elements";
import { BottomLeft, BottomRight, TopLeft, TopRight } from "./Links";

const components = {
  1: {
    StyledLink: TopLeft,
  },
  2: {
    StyledLink: TopRight,
  },
  3: {
    StyledLink: BottomLeft,
  },
  4: {
    StyledLink: BottomRight,
  },
};

const HomePageLink = ({ text, destination, position }) => {
  const { StyledLink } = components[position];

  return (
    <StyledLink to={destination}>
      <H2>{text}</H2>
    </StyledLink>
  );
};

export default HomePageLink;
