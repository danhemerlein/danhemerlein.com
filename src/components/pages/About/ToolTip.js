import CloseIcon from 'components/base/icons/Close';
import { bool, func } from 'prop-types';
import styled from 'styled-components';
import { P } from 'styles/elements';
import { remHelper } from 'utils';

const StyledToolTip = styled.div`
  opacity: 0;
  z-index: 5;
  visibility: hidden;
  position: absolute;
  top: 0;
  right: 0;
  width: 75%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  border-color: ${({ theme }) => theme.border};
  border: 1px solid;

  padding: ${remHelper[16]};

  transition: opacity 0.25s ease-in-out;

  ${({ toolTipOpen }) =>
    toolTipOpen &&
    `
    opacity: 1;
    visibility: visible;
  `};
`;

const StyledCloseButton = styled.button`
  cursor: pointer;
  border: 0;
  padding: 0;
  outline: none;
  background: transparent;
  width: 2.4rem;
  height: 2.4rem;
  display: block;
  margin-left: auto;

  &:focus {
    border: 1px solid;
    border-color: ${({ theme }) => theme.border};
  }
`;

const DT = styled(P)`
  font-weight: bold;
  line-height: 1.24;
`;

const DD = styled(P)`
  margin: ${remHelper[8]};
  line-height: 1.24;
`;

const ToolTip = ({ toolTipOpen, toggleToolTip }) => {
  return (
    <StyledToolTip toolTipOpen={toolTipOpen}>
      <StyledCloseButton onClick={toggleToolTip}>
        <CloseIcon width="2.4rem" height="2.4rem" />
      </StyledCloseButton>
      <dl>
        <DT as="dt">interests:</DT>
        <DD as="dd">
          emergance, journaling, calm tech, sustainability, accessibilty,
          learning something new every day, pick up basketball
        </DD>
        <DT as="dt">ultimate abilities:</DT>
        <DD as="dd">punk rock bass guitar, web engineering</DD>

        <DT as="dt">currently learning:</DT>
        <DD as="dd">web/graphic design, albeton live 11</DD>

        <DT as="dt">want to learn:</DT>
        <DD as="dd">video production/editing, skateboarding</DD>

        <DT as="dt">favorite beer:</DT>
        <DD as="dd">miller high life</DD>

        <DT as="dt">favorite gum:</DT>
        <DD as="dd">juicy fruit</DD>

        <DT as="dt">favorite williamsburg coffee shop:</DT>
        <DD as="dd">fiction</DD>
      </dl>
    </StyledToolTip>
  );
};

ToolTip.propTypes = {
  toolTipOpen: bool.isRequired,
  toggleToolTip: func.isRequired,
};

export default ToolTip;
