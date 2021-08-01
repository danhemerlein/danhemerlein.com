import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@reach/accordion";
import styled from "styled-components";
import { blackBorder } from "styles/utilities";
import { remHelper } from "utils";
import LaunchDate from "../LaunchDate";
import ProjectContent from "../ProjectContent";
import ProjectTitle from "../ProjectTitle";

const Button = styled(AccordionButton)`
  border: ${blackBorder};
  margin-top: ${remHelper[16]};
  padding: ${remHelper[32]};
  width: 100%;
  cursor: pointer;

  ${({ gradientRotation, gradientStart, gradientEnd }) =>
    gradientRotation &&
    gradientStart &&
    gradientEnd &&
    `
      background: linear-gradient(${gradientRotation}, ${gradientStart}, ${gradientEnd})};
    `};
`;

const Panel = styled(AccordionPanel)`
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &[data-state="open"] {
    display: flex;
  }
`;

const HighlightCodeProject = ({
  project,
  gradientRotation,
  gradientStart,
  gradientEnd,
}) => {
  const { title, timelineLaunchDate, description } = project.fields;
  return (
    <AccordionItem>
      <Button
        gradientRotation={gradientRotation}
        gradientStart={gradientStart}
        gradientEnd={gradientEnd}
      >
        <ProjectTitle title={title} />

        <LaunchDate launchDate={timelineLaunchDate} />
      </Button>

      <Panel>
        <ProjectContent description={description} />
      </Panel>
    </AccordionItem>
  );
};

export default HighlightCodeProject;
