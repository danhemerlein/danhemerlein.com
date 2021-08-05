import { AccordionItem } from "@reach/accordion";
import Button from "../Accordion/Button";
import Panel from "../Accordion/Panel";

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

export default CodeProject;
