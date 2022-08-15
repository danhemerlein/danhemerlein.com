import { AccordionButton, useAccordionItemContext } from '@reach/accordion';
import { bool, string, func } from 'prop-types';
import styled from 'styled-components';
import { remHelper } from 'utils/remHelper';
import LaunchDate from '../LaunchDate';
import ProjectTitle from '../ProjectTitle';
import ReadMoreReadLess from './ReadMoreReadLess';

// const StyledButton = styled(AccordionButton)`
//   width: 100%;
//   cursor: pointer;
//   display: flex;
//   margin-top: ${remHelper[16]};
//   padding: ${remHelper[16]};
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   font-family: 'custom_serif';

//   background-color: ${({ theme }) => {
//     return theme.background;
//   }};

//   color: ${({ theme }) => {
//     return theme.foreground;
//   }};

//   border: 1px solid;
//   border-color: ${({ theme }) => {
//     return theme.border;
//   }};

//   outline: none;

//   ${({ theme, $gradientRotation, $gradientStart, $gradientEnd }) => {
//     return (
//       $gradientRotation &&
//       $gradientStart &&
//       $gradientEnd &&
//       `
//       background: linear-gradient(${$gradientRotation}, ${$gradientStart}, ${$gradientEnd})};

//       color: ${theme.general.black};
//     `
//     );
//   }};
// `;

const StyledButton = styled.button`
  width: 100%;
  cursor: pointer;
  display: flex;
  margin-top: ${remHelper[16]};
  padding: ${remHelper[16]};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: 'custom_serif';
  background-color: ${({ theme }) => {
    return theme.background;
  }};
  color: ${({ theme }) => {
    return theme.foreground;
  }};
  border: 1px solid;
  border-color: ${({ theme }) => {
    return theme.border;
  }};
  outline: none;
  ${({ theme, $gradientRotation, $gradientStart, $gradientEnd }) => {
    return (
      $gradientRotation &&
      $gradientStart &&
      $gradientEnd &&
      `
       background: linear-gradient(${$gradientRotation}, ${$gradientStart}, ${$gradientEnd})};

       color: ${theme.general.black};
     `
    );
  }};
`;

const Button = ({
  title,
  launchDate,
  className,
  $gradientRotation,
  $gradientStart,
  $gradientEnd,
  id,
  collapsed,
  handleClick
}) => {
  // const { isExpanded } = useAccordionItemContext();

  return (
    // <StyledButton
    //   className={className}
    //   $gradientRotation={$gradientRotation}
    //   $gradientStart={$gradientStart}
    //   $gradientEnd={$gradientEnd}
    //   id={id}
    // >
    //   <span>
    //     <ProjectTitle title={title} />

    //     {launchDate && <LaunchDate launchDate={launchDate} />}
    //   </span>

    //   <ReadMoreReadLess expanded={isExpanded} />
    // </StyledButton>

    <StyledButton
      className={className}
      $gradientRotation={$gradientRotation}
      $gradientStart={$gradientStart}
      $gradientEnd={$gradientEnd}
      id={`${id}-button`}
      data-state={collapsed ? 'collapsed' : 'open'}
      aria-controls={`${id}-panel`}
      onClick={handleClick}
    >
      <span>
        <ProjectTitle title={title} />

        {launchDate && <LaunchDate launchDate={launchDate} />}
      </span>

      <ReadMoreReadLess expanded={collapsed} />
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
  collapsed: bool.isRequired,
  handleClick: func.isRequired
};

Button.defaultProps = {
  className: '',
  launchDate: '',
  $gradientRotation: '',
  $gradientStart: '',
  $gradientEnd: ''
};

export default Button;
