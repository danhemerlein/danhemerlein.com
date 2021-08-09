import React from "react";
import styled from "styled-components";
import { P } from "styles/elements";
import { above } from "styles/utilities";
import { remHelper } from "utils";

const StyledAnchor = styled.a`
  text-decoration: underline;
  color: ${({ theme }) => theme.light.foreground};
  font-size: ${remHelper[16]};
  margin-top: ${remHelper[16]};
  width: 25%;
  display: flex;
  justifty-content: center;
  align-items: center;
  flex-direction: column;

  &:visited {
    color: ${({ theme }) => theme.light.foreground};
  }
`;

const StyledImg = styled.img`
  margin-bottom: ${remHelper[16]};
  width: 25%;

  ${above.tablet`
    width: 50%;
  `};
`;

export default function VisitProject({ link, hasImage, image }) {
  return (
    <StyledAnchor href={link} target="_blank" rel="noopener noreferrer">
      {hasImage && (
        <StyledImg src={image.fields.file.url} alt={image.fields.file.title} />
      )}

      <P>visit project</P>
    </StyledAnchor>
  );
}
