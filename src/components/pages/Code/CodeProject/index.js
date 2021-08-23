import { AccordionItem } from '@reach/accordion';
import { bool, number, string } from 'prop-types';
import { codeProjectPropTypes, imagePropTypes } from 'propTypes';
import Button from '../Accordion/Button';
import Panel from '../Accordion/Panel';

const CodeProject = ({
  project,
  index,
  hasImage,
  $gradientRotation,
  $gradientStart,
  $gradientEnd,
}) => {
  const {
    link,
    title,
    timelineLaunchDate,
    image,
    description,
  } = project.fields;

  return (
    <AccordionItem index={index}>
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
    </AccordionItem>
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
