import styled from "styled-components";
import { FlexContainer, P } from "styles/elements";
import { above, transparentBorder, whiteBorder } from "styles/utilities";
import { remHelper } from "utils";
import { i, j, k } from "./data";

const Inner = styled(FlexContainer)`
  width: 100%;
`;

const StyledA = styled.a`
  text-decoration: none;
  padding-bottom: ${remHelper[4]};
  border-bottom: ${transparentBorder};
  margin-bottom: ${remHelper[16]};
  transition: border 0.25s ease-in-out;

  ${({ desktop }) => desktop && `display: none;`};
  ${({ mobile }) => mobile && `display: block;`};

  ${above.desktop`
    ${({ mobile }) => mobile && `display: none;`};
    ${({ desktop }) => desktop && `display: block;`};
  `}

  &:hover {
    border-bottom: ${whiteBorder};
  }
`;

const LinkTitleContainer = styled(FlexContainer)`
  width: 100%;
`;

const StyledListItem = styled.li`
  margin-top: ${remHelper[8]};

  ${above.desktop`
    margin-top: 0;
  `}
`;

const Links = ({ link }) => {
  if (link.link !== undefined) {
    return (
      <StyledListItem>
        <StyledA
          mobile
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Inner justify="space-between" as="span">
            {i.map((item) => {
              const [id, sym] = item;
              return (
                <P as="span" white key={id}>
                  {sym}
                </P>
              );
            })}

            <P white as="span">
              {link.title}
            </P>

            {j.map((item) => {
              const [id, sym] = item;
              return (
                <P as="span" white key={id}>
                  {sym}
                </P>
              );
            })}
          </Inner>
        </StyledA>

        <StyledA
          desktop
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          key={link.link}
        >
          <LinkTitleContainer justify="space-between" as="span">
            {k.map((item) => {
              const [id, sym] = item;

              return (
                <P as="span" white key={id}>
                  {sym}
                </P>
              );
            })}
            <P white as="span">
              {link.title}
            </P>
          </LinkTitleContainer>
        </StyledA>
      </StyledListItem>
    );
  }
  return null;
};

export default Links;
