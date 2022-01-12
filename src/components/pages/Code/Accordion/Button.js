import { AccordionButton, useAccordionItemContext } from '@reach/accordion';
import { string } from 'prop-types';
import styled from 'styled-components';
import { remHelper } from 'utils/remHelper';
import LaunchDate from '../LaunchDate';
import ProjectTitle from '../ProjectTitle';
import ReadMoreReadLess from './ReadMoreReadLess';

const StyledButton = styled(AccordionButton)`
  width: 100%;
  cursor: pointer;
  display: flex;
  margin-top: ${remHelper[16]};
  padding: ${remHelper[16]};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: 'custom_serif';

  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};

  outline: none;

  ${({ theme, $gradientRotation, $gradientStart, $gradientEnd }) =>
    $gradientRotation &&
    $gradientStart &&
    $gradientEnd &&
    `
      background: linear-gradient(${$gradientRotation}, ${$gradientStart}, ${$gradientEnd})};
      color: ${theme.general.black};
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

        {launchDate && <LaunchDate launchDate={launchDate} />}
      </span>

      <ReadMoreReadLess expanded={isExpanded} />
    </StyledButton>
  );
};

Button.propTypes = {
  title: string.isRequired,
  launchDate: string,
  className: string,
  $gradientRotation: string,
  $gradientStart: string,
  $gradientEnd: string,
};

Button.defaultProps = {
  className: '',
  launchDate: '',
  $gradientRotation: '',
  $gradientStart: '',
  $gradientEnd: '',
};

export default Button;
