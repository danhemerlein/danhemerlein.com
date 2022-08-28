import { func, string } from 'prop-types';
import { useEffect } from 'react';
import styled from 'styled-components';
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
`;

const Button = ({ className, clickHandler, children, type }) => {
  useEffect(() => {
    clickHandler();
  }, []);

  return (
    <StyledButton
      type={type}
      onClick={() => {
        return clickHandler();
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
  type: string
};

export default Button;
