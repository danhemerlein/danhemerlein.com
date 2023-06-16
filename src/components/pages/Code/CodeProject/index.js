import { useState } from 'react';
import { bool, number, string } from 'prop-types';
import { codeProjectPropTypes, imagePropTypes } from 'propTypes';
import AnimateHeight from 'react-animate-height';
import Button from '../Accordion/Button';
import Panel from '../Accordion/Panel';

const CodeProject = ({
  project,
  index,
  hasImage,
  $gradientRotation,
  $gradientStart,
  $gradientEnd
}) => {
  const { link, title, timelineLaunchDate, image, description } = project;
  const [collapsed, setCollapsed] = useState(true);
  const clickHandler = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div index={index} data-state={collapsed ? 'collapsed' : 'open'}>
      <Button
        title={title}
        launchDate={timelineLaunchDate}
        $gradientRotation={$gradientRotation}
        $gradientStart={$gradientStart}
        $gradientEnd={$gradientEnd}
        id={title}
        collapsed={collapsed}
        handleClick={clickHandler}
      />

      <AnimateHeight height={collapsed ? 0 : 'auto'}>
        <Panel
          link={link}
          description={description}
          image={image}
          hasImage={hasImage}
          collapsed={collapsed}
          title={title}
        />
      </AnimateHeight>
    </div>
  );
};

CodeProject.propTypes = {
  project: codeProjectPropTypes.isRequired,
  index: number.isRequired,
  title: string.isRequired,
  image: imagePropTypes,
  hasImage: bool,
  $gradientRotation: string,
  $gradientStart: string,
  $gradientEnd: string
};

CodeProject.defaultProps = {
  image: undefined,
  hasImage: false,
  $gradientRotation: '',
  $gradientStart: '',
  $gradientEnd: ''
};

export default CodeProject;
