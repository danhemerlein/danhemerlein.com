import { AccordionItem } from '@reach/accordion';
import { bool, number, string } from 'prop-types';
import { codeProjectPropTypes, imagePropTypes } from 'propTypes';
import styled from 'styled-components';
import Button from '../Accordion/Button';
import Panel from '../Accordion/Panel';

const StyledAccordionItem = styled(AccordionItem)`
  width: 100%;
`;

const CodeProject = ({
  project,
  index,
  hasImage,
  $gradientRotation,
  $gradientStart,
  $gradientEnd,
}) => {
  const { link, title, timelineLaunchDate, image, description } =
    project.fields;

  return (
    <StyledAccordionItem index={index}>
      <Button
        title={title}
        launchDate={timelineLaunchDate}
        $gradientRotation={$gradientRotation}
        $gradientStart={$gradientStart}
        $gradientEnd={$gradientEnd}
      />

      <Panel
        link={link}
        description={description}
        image={image}
        hasImage={hasImage}
      />
    </StyledAccordionItem>
  );
};

CodeProject.propTypes = {
  project: codeProjectPropTypes.isRequired,
  index: number.isRequired,
  image: imagePropTypes,
  hasImage: bool,
  $gradientRotation: string,
  $gradientStart: string,
  $gradientEnd: string,
};

CodeProject.defaultProps = {
  image: undefined,
  hasImage: false,
  $gradientRotation: '',
  $gradientStart: '',
  $gradientEnd: '',
};

export default CodeProject;
