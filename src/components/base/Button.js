import { func, string } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { globalTransition } from 'styles/utilities';
import { anchorColor } from 'styles/utilities/mixins';
import { remHelper } from 'utils/remHelper';

export const StyledButton = styled.button`
  cursor: pointer;

  padding: ${remHelper[8]};

  border: 1px solid;
  border-color: ${({ theme }) => {
    return theme.foreground;
  }};
  border-radius: 0;

  background: ${({ theme }) => {
    return theme.background;
  }};

  color: ${({ theme }) => {
    return theme.foreground;
  }};

  transition: background ${globalTransition}, color ${globalTransition},
    border-color ${globalTransition};

  &:hover,
  &:focus {
    background: ${({ theme }) => {
      return theme.foreground;
    }};
    border-color: ${({ theme }) => {
      return theme.background;
    }};
    color: ${({ theme }) => {
      return theme.background;
    }};
  }
`;

export const StyledLink = styled(Link)`
  cursor: pointer;

  padding: ${remHelper[8]};

  border: 1px solid;
  border-color: ${({ theme }) => {
    return theme.foreground;
  }};

  border-radius: 0;

  ${({ theme }) => {
    return anchorColor({
      color: theme.anchor
    });
  }}

  border-color ${globalTransition};
`;

export const StyledAnchor = styled.a`
  cursor: pointer;

  padding: ${remHelper[8]};

  border: 1px solid;

  border-color: ${({ theme }) => {
    return theme.foreground;
  }};

  border-radius: 0;

  ${({ theme }) => {
    return anchorColor({
      color: theme.anchor
    });
  }}

  &:hover,
  &:focus {
    background: ${({ theme }) => {
      return theme.foreground;
    }};
    border-color: ${({ theme }) => {
      return theme.background;
    }};
    color: ${({ theme }) => {
      return theme.background;
    }};
  }

  transition: background ${globalTransition}, color ${globalTransition},
    border-color ${globalTransition};
`;

const Button = ({
  className,
  clickHandler,
  children,
  type,
  onMouseEnter,
  onMouseLeave,
  link,
  to,
  anchor,
  href,
  target,
  rel
}) => {
  if (link) {
    return (
      <StyledLink to={to} className={className}>
        {children}
      </StyledLink>
    );
  }

  if (anchor) {
    return (
      <StyledAnchor href={href} target={target} rel={rel} className={className}>
        {children}
      </StyledAnchor>
    );
  }

  return (
    <StyledButton
      type={type}
      onClick={() => {
        return clickHandler();
      }}
      onMouseEnter={() => {
        return onMouseEnter();
      }}
      onMouseLeave={() => {
        return onMouseLeave();
      }}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  className: string,
  clickHandler: func,
  type: string,
  onMouseEnter: func,
  onMouseLeave: func
};

Button.defaultProps = {
  onMouseEnter: (_) => {
    return _;
  },
  onMouseLeave: (_) => {
    return _;
  }
};

export default Button;
