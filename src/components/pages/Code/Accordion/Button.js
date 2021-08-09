import { AccordionButton, useAccordionItemContext } from "@reach/accordion";
import React from "react";
import styled from "styled-components";
import { blackBorder } from "styles/utilities";
import { remHelper } from "utils";
import LaunchDate from "../LaunchDate";
import ProjectTitle from "../ProjectTitle";
import ReadMoreReadLess from "./ReadMoreReadLess";

const StyledButton = styled(AccordionButton)`
  width: 100%;
  background: ${({ theme }) => theme.light.background};
  cursor: pointer;
  display: flex;
  margin-top: ${remHelper[16]};
  padding: ${remHelper[16]};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: "custom_serif";
  border: ${blackBorder};
  outline: none;

  ${({ $gradientRotation, $gradientStart, $gradientEnd }) =>
    $gradientRotation &&
    $gradientStart &&
    $gradientEnd &&
    `
      background: linear-gradient(${$gradientRotation}, ${$gradientStart}, ${$gradientEnd})};
    `};
`;

const Button = ({
  title,
  launchDate,
  className,
  $gradientRotation,
  $gradientStart,
  $gradientEnd,
}) => {
  const { isExpanded } = useAccordionItemContext();

  return (
    <StyledButton
      className={className}
      $gradientRotation={$gradientRotation}
      $gradientStart={$gradientStart}
      $gradientEnd={$gradientEnd}
    >
      <span>
        <ProjectTitle title={title} />

        <LaunchDate launchDate={launchDate} />
      </span>

      <ReadMoreReadLess expanded={isExpanded} />
    </StyledButton>
  );
};

export default Button;
