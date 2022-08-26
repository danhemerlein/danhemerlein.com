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
    } else {
      // toast('three saved countdowns is the maxium');
    }
  };

  const createLink = (title) => {
    navigator.clipboard.writeText(
      `https://countdown-garden.art/d${title.replace(' ', 't')}`
    );
    // toast('link copied to clipboard');
  };

  return (
    <styles.Container>
      <styles.Paragraph>{title}</styles.Paragraph>

      {countdown(title).map((str) => {
        return <styles.Paragraph key={str}>{str}</styles.Paragraph>;
      })}

      <styles.RemoveButton
        onClick={() => {
          return handleClick();
        }}
      >
        remove countdown
      </styles.RemoveButton>
      <styles.LinkButton
        onClick={() => {
          return createLink(title);
        }}
      >
        copy link
      </styles.LinkButton>
    </styles.Container>
  );
};

export default SavedCountdown;
