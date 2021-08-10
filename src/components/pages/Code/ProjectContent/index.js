import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "styled-components";
import { remHelper } from "utils";

const DescriptionContent = styled.div`
  margin-top: ${remHelper[16]};

  p {
    font-family: "custon_serif";
    font-size: ${remHelper[16]};
    line-height: 1.25;
    width: 75%;
    margin: 0 auto;
    text-align: justify;
  }

  a {
    text-decoration: underline;
    color: ${({ theme }) => theme.light.foreground};

    &:visited {
      color: ${({ theme }) => theme.light.foreground};
    }
  }
`;

const options = {
  renderNode: {
    node: (text) => {
      return <p key={`${text}-key`}>{text}</p>;
    },
  },
};

const ProjectContent = ({ description }) => {
  return (
    <DescriptionContent>
      {documentToReactComponents(description, options)}
    </DescriptionContent>
  );
};

export default ProjectContent;
