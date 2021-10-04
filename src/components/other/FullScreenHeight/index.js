import { string } from 'prop-types';
import { componentPropType } from 'propTypes';
import { use100vh } from 'react-div-100vh';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { BREAKPOINT } from 'styles/utilities';
import { remHelper } from 'utils';

const Container = styled.div`
  height: 100%;
  display: flex;
  padding: ${remHelper[16]} 0;

  ${({ justify }) => justify && `justify-content: ${justify};`}
  ${({ items }) => items && `align-items: ${items};`}
  ${({ direction }) => direction && `flex-direction: ${direction};`}
  ${({ noTopPadding }) => noTopPadding && `padding-top: 0;`}
`;

const FullScreenHeight = ({
  children,
  unsetBreakpoint,
  justify,
  items,
  direction,
  noTopPadding,
}) => {
  const PADDING = 32;
  const HEADER_HEIGHT = 22;
  const FOOTER_HEIGHT = 22;

  const offset = PADDING + HEADER_HEIGHT + FOOTER_HEIGHT;
  const height = use100vh();
  let breakpoint;
  const mediaQuery = useMediaQuery({
    query: `(min-width: ${BREAKPOINT[unsetBreakpoint]})`,
  });

  if (unsetBreakpoint !== 'none') {
    breakpoint = mediaQuery;
  } else {
    breakpoint = 'none';
  }

  const generateHeight = (mediaQuery, height, heightOffset) => {
    if (mediaQuery === 'none') {
      return height - heightOffset;
    }
    return mediaQuery ? height - heightOffset : 'auto';
  };

  return (
    <div style={{ height: generateHeight(breakpoint, height, offset) }}>
      <Container
        noTopPadding={noTopPadding}
        justify={justify}
        items={items}
        direction={direction}
      >
        {children}
      </Container>
    </div>
  );
};

FullScreenHeight.propTypes = {
  unsetBreakpoint: string,
  justify: string,
  items: string,
  direction: string,
  children: componentPropType.isRequired,
};

FullScreenHeight.defaultProps = {
  unsetBreakpoint: 'none',
  justify: 'center',
  items: 'center',
  direction: 'row',
};

export default FullScreenHeight;
