import CloseIcon from 'components/base/icons/Close';
import FocusTrap from 'focus-trap-react';
import { bool, func } from 'prop-types';
import * as styles from './ToolTip.styles';

const ToolTip = ({ toolTipOpen, toggleToolTip, activeTrap, unmountTrap }) => {
  const handleClick = () => {
    toggleToolTip();
    unmountTrap();
  };
  return (
    <styles.StyledToolTip toolTipOpen={toolTipOpen}>
      {activeTrap && (
        <FocusTrap
          focusTrapOptions={{
            fallbackFocus: '#tool-tip-trap',
            allowOutsideClick: true,
            onDeactivate: unmountTrap
          }}
        >
          <div id="tool-tip-trap">
            <styles.CloseButton onClick={handleClick}>
              <CloseIcon width="2.4rem" height="2.4rem" />
            </styles.CloseButton>
            <dl>
              <styles.DT as="dt">interests</styles.DT>
              <span>:</span>
              <styles.DD as="dd">
                emergence, calm tech, sustainability, accessibility, pick up
                basketball
              </styles.DD>

              <styles.DT as="dt">ultimate abilities</styles.DT>
              <span>:</span>
              <styles.DD as="dd">
                making websites, punk rock bass guitar
              </styles.DD>

              <styles.DT as="dt">currently learning</styles.DT>
              <span>:</span>
              <styles.DD as="dd">web/graphic design, ableton live 11</styles.DD>

              <styles.DT as="dt">want to learn</styles.DT>
              <span>:</span>
              <styles.DD as="dd">
                video production/editing, skateboarding, 3D design/animation
              </styles.DD>

              <styles.DT as="dt">favorite beer</styles.DT>
              <span>:</span>
              <styles.DD as="dd">miller high life</styles.DD>

              <styles.DT as="dt">favorite gum</styles.DT>
              <span>:</span>
              <styles.DD as="dd">juicy fruit</styles.DD>

              <styles.DT as="dt">favorite williamsburg coffee shop</styles.DT>
              <span>:</span>
              <styles.DD as="dd">fiction</styles.DD>
            </dl>
          </div>
        </FocusTrap>
      )}
    </styles.StyledToolTip>
  );
};

ToolTip.propTypes = {
  toolTipOpen: bool.isRequired,
  toggleToolTip: func,
  activeTrap: bool.isRequired,
  unmountTrap: func.isRequired
};

ToolTip.defaultProps = {
  toggleToolTip: (_) => {
    return _;
  }
};

export default ToolTip;
