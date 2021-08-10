import { AccordionButton, useAccordionItemContext } from "@reach/accordion";
import { useThemeContext } from "context/ThemeContext";
import React from "react";
import styled from "styled-components";
import { remHelper } from "utils";
import LaunchDate from "../LaunchDate";
import ProjectTitle from "../ProjectTitle";
import ReadMoreReadLess from "./ReadMoreReadLess";

const StyledButton = styled(AccordionButton)`
  width: 100%;
  cursor: pointer;
  display: flex;
  margin-top: ${remHelper[16]};
  padding: ${remHelper[16]};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: "custom_serif";

  background-color: ${({ theme, $mode }) => theme[$mode].background};
  color: ${({ theme, $mode }) => theme[$mode].foreground};
  border: 1px solid;
  border-color: ${({ theme, $mode }) => theme[$mode].borderColor};

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
  const mode = useThemeContext();

  return (
    <StyledButton
      className={className}
      $gradientRotation={$gradientRotation}
      $gradientStart={$gradientStart}
      $gradientEnd={$gradientEnd}
      $mode={mode}
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
