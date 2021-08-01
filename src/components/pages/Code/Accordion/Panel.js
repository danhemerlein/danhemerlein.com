import { AccordionPanel } from "@reach/accordion";
import React from "react";
import styled from "styled-components";
import ProjectContent from "../ProjectContent";
import VisitProject from "../VisitProject";

const StyledPanel = styled(AccordionPanel)`
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &[data-state="open"] {
    display: flex;
  }
`;

export default function Panel({ link, description, image, hasImage }) {
  return (
    <StyledPanel>
      <VisitProject link={link} image={image} hasImage={hasImage} />

      <ProjectContent description={description} />
    </StyledPanel>
  );
}
