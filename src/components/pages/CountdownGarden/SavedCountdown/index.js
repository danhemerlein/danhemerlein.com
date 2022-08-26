import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { removeCountdown } from 'store/actions/countdowns';
import { countdown } from 'utils/lib';
import * as styles from './SavedCountdown.styles';

const SavedCountdown = ({ countdowns, title }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const cdsRemove = countdowns;

    _.pull(cdsRemove, title);

    if (countdowns.length < 4) {
      dispatch(removeCountdown([...cdsRemove]));
    }
  };

  return (
    <styles.Container>
      <styles.Paragraph>{title}</styles.Paragraph>

      {countdown(title).map((str) => {
        return <styles.Paragraph key={str}>{str}</styles.Paragraph>;
      })}

      <styles.Button
        onClick={() => {
          return handleClick();
        }}
      >
        remove countdown
      </styles.Button>
    </styles.Container>
  );
};

export default SavedCountdown;
