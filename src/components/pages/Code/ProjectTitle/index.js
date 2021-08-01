import React from "react";
import styled from "styled-components";
import { H2 } from "styles/elements";

const StyledH2 = styled(H2)`
  margin: 0;
`;

export default function ProjectTitle({ title }) {
  return <StyledH2 textAlign="left">{title}</StyledH2>;
}
