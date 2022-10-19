import { bool } from 'prop-types';
import styled from 'styled-components';

const StyledSVG = styled.svg`
  path {
    fill: ${({ hovered, theme, liked }) => {
      if (liked && hovered) {
        return theme.foreground;
      }

      if (liked) {
        return theme.background;
      }

      if (hovered && !liked) {
        return theme.background;
      }

      if (hovered && liked) return theme.foreground;
    }};
  }
`;

const EmptyHeart = ({ hovered, liked }) => {
  return (
    <StyledSVG
      width="700pt"
      height="700pt"
      version="1.1"
      viewBox="0 0 700 550"
      xmlns="http://www.w3.org/2000/svg"
      hovered={hovered}
      liked={liked}
    >
      <g>
        <path d="m281.92 156.73c-21.02 0-42.008 7.5859-58.273 22.75-32.535 30.324-32.492 81.48 0 111.82l114.8 107.45h-0.003906c3.1133 2.9062 7.207 4.5195 11.461 4.5195 4.2578 0 8.3516-1.6133 11.465-4.5195 38.336-35.73 76.641-71.543 114.98-107.27 32.535-30.324 32.535-81.5 0-111.82-32.535-30.328-84.012-30.328-116.55 0l-9.625 8.9258-9.9766-9.1016c-16.27-15.164-37.254-22.75-58.273-22.75zm0 33.773c12.855 0 25.66 4.4453 35.352 13.477l21.352 19.949h-0.003906c3.1094 2.9023 7.207 4.5195 11.461 4.5195 4.2578 0 8.3516-1.6172 11.465-4.5195l21.176-19.773c19.379-18.062 51.324-18.062 70.699 0 19.379 18.062 19.375 44.766 0 62.824-34.496 32.156-68.926 64.27-103.43 96.426l-103.43-96.602c-19.371-18.09-19.375-44.766 0-62.824 9.6875-9.0312 22.496-13.477 35.352-13.477z" />
      </g>
    </StyledSVG>
  );
};

EmptyHeart.propTypes = {
  hovered: bool,
  liked: bool
};

EmptyHeart.defaultProps = {
  hovered: false,
  liked: false
};

export default EmptyHeart;
