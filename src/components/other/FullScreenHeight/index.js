import React from "react";
import { use100vh } from "react-div-100vh";
import styled from "styled-components";
import { BREAKPOINT, checkMediaQuery } from "styles/utilities";
import { remHelper } from "utils";

const Container = styled.div`
  height: 100%;
  display: flex;
  ${"" /* justify-content: center; */}
  ${"" /* align-items: center; */}

  ${({ justify }) => justify && `justify-content: ${justify};`}

  ${({ items }) => items && `align-items: ${items};`}
  padding: ${remHelper[16]} 0;
`;

export default function FullScreenHeight({
  children,
  unsetBreakpoint = "tablet",
  justify = "center",
  items = "center",
}) {
  const PADDING = 32;
  const HEADER_HEIGHT = 22;
  const FOOTER_HEIGHT = 22;

  const offset = PADDING + HEADER_HEIGHT + FOOTER_HEIGHT;
  const height = use100vh();
  let breakpoint;

  if (unsetBreakpoint !== "none") {
    breakpoint = checkMediaQuery(BREAKPOINT[unsetBreakpoint]);
  } else {
    breakpoint = "none";
  }

  const generateHeight = (mediaQuery, height, heightOffset) => {
    if (mediaQuery === "none") {
      return height - heightOffset;
    }
    return mediaQuery ? height - heightOffset : "auto";
  };

  return (
    <div style={{ height: generateHeight(breakpoint, height, offset) }}>
      <Container justify={justify} items={items}>
        {children}
      </Container>
    </div>
  );
}
