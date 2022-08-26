import FullScreenHeight from 'components/other/FullScreenHeight';
import { useState } from 'react';
import { connect } from 'react-redux';
import { FlexContainer } from 'styles/elements';
import { buildDay } from 'utils/lib';
import Countdown from './Countdown';
import DateForm from './DateForm';
import * as styles from './Garden.styles';
import SavedCountdown from './SavedCountdown';

const Garden = ({ countdowns }) => {
  const [localCountdown, setLocalCountdown] = useState('');
  const now = new Date();

  const year = now.getFullYear();
  let month = now.getMonth();
  let day = now.getDate();

  day = buildDay(day);

  month += 1;
  month = buildDay(month);

  const today = `${year}-${month}-${day}`;

  return (
    <FullScreenHeight unsetBreakpoint="desktop">
      <FlexContainer direction="column">
        <styles.Headline>countdown garden</styles.Headline>

        <DateForm
          today={today}
          setLocalCountdown={setLocalCountdown}
          localCountdowns={localCountdown}
        />

        <styles.CountdownContainer>
          {localCountdown.length ? (
            <styles.LocalCountdown>
              <Countdown countdowns={countdowns} date={localCountdown} />
            </styles.LocalCountdown>
          ) : null}
        </styles.CountdownContainer>
      </FlexContainer>

      {countdowns.length ? (
        <styles.SavedCountdowns>
          <styles.Paragraph>saved countdowns:</styles.Paragraph>

          <>
            {countdowns.map((countdown) => {
              return (
                <SavedCountdown
                  key={countdown}
                  title={countdown}
                  countdowns={countdowns}
                />
              );
            })}
          </>
        </styles.SavedCountdowns>
      ) : null}
    </FullScreenHeight>
  );
};

const mapStateToProps = (state) => {
  return {
    countdowns: state.countdowns.countdowns
  };
};

export default connect(mapStateToProps)(Garden);
