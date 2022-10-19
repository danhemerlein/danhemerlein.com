import { shape, string } from 'prop-types';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import {
  above,
  anchorColor,
  globalTransition,
  transparentBorder
} from 'styles/utilities';
import { remHelper } from 'utils/remHelper';
import { i, j, k } from './data';

const Inner = styled(FlexContainer)`
  width: 100%;
`;

const StyledA = styled.a`
  padding-bottom: ${remHelper[4]};
  border-bottom: ${transparentBorder};
  margin-bottom: ${remHelper[16]};
  transition: border ${globalTransition};

  ${({ desktop }) => {
    return desktop && `display: none;`;
  }};
  ${({ mobile }) => {
    return mobile && `display: block;`;
  }};

  ${above.desktop`
    ${({ mobile }) => {
      return mobile && `display: none;`;
    }};
    ${({ desktop }) => {
      return desktop && `display: block;`;
    }};
  `}

  &:hover {
    border-bottom: 1px solid;
    border-color: ${({ theme }) => {
      return theme.border;
    }};
  }

  ${({ theme }) => {
    return anchorColor({
      color: theme.anchor,
      textDecorationHover: 'none'
    });
  }}
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

Links.propTypes = {
  link: shape({
    title: string.isRequired,
    link: string.isRequired
  })
};

Links.defaultProps = {
  link: undefined
};

export default Links;
