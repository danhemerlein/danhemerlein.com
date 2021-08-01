import { AccordionItem } from "@reach/accordion";
import React from "react";
import Button from "../Accordion/Button";
import Panel from "../Accordion/Panel";

const CodeProject = ({ project, index, hasImage }) => {
  const {
    link,
    title,
    timelineLaunchDate,
    image,
    description,
  } = project.fields;

  return (
    <AccordionItem index={index}>
      <Button title={title} launchDate={timelineLaunchDate} />

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
