import { AccordionPanel } from "@reach/accordion";
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

const Panel = ({ link, description, image, hasImage }) => {
  return (
    <StyledPanel>
      <VisitProject link={link} image={image} hasImage={hasImage} />

      <ProjectContent description={description} />
    </StyledPanel>
  );
};

export default Panel;
