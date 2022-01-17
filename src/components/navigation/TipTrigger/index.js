import { func } from 'prop-types';
import styled from 'styled-components';
import { P } from 'styles/elements';

const StyledButton = styled.button`
  cursor: pointer;
  border: transparent;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
  font-family: 'custom_serif';
  background-color: ${({ theme }) => {
    return theme.background;
  }};
  color: ${({ theme }) => {
    return theme.foreground;
  }};
`;

const TipTrigger = ({ clickHandler, mountTrap }) => {
  const handleClick = () => {
    clickHandler();
    mountTrap();
  };

  return (
    <StyledButton type="button" onClick={handleClick}>
      <P as="span">🤑 👀 🤑</P>
    </StyledButton>
  );
};

TipTrigger.propTypes = {
  clickHandler: func.isRequired
};

export default TipTrigger;
