import Loading from 'components/other/Loading';
import { usePalette } from 'react-palette';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above, fullBleed } from 'styles/utilities';
import { remHelper } from 'utils';

const Project = styled(FlexContainer)`
  position: relative;
  height: 100%;
  padding: ${remHelper[16]};
  justify-content: space-between;
  ${fullBleed({ space: 1.6, right: true, left: true })};
  overflow-y: scroll;

  ${({ lightMuted, muted }) =>
    lightMuted &&
    muted &&
    `background-image: linear-gradient(45deg, ${lightMuted}, ${muted})`};

  ${above.tablet`
  justify-content: center;
  overflow-y: unset;
`}
`;

const ProjectContainer = ({ children, artwork }) => {
  const pallete = usePalette(`https:${artwork.fields.file.url}`);
  const { loading, data } = pallete;
  if (!loading) {
    return (
      <Project
        items="center"
        direction="column"
        lightMuted={data.lightMuted}
        muted={data.muted}
      >
        {children}
      </Project>
    );
  } else {
    return <Loading />;
  }
};

export default ProjectContainer;
