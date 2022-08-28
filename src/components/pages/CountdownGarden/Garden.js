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
      <styles.Container>
        <FlexContainer direction="column">
          <styles.Headline textAlign="center">countdown garden</styles.Headline>

          <DateForm
            today={today}
            setLocalCountdown={setLocalCountdown}
            localCountdowns={localCountdown}
          />

          {localCountdown.length ? (
            <styles.LocalCountdown
              items="center"
              jusify="center"
              direction="column"
            >
              <Countdown countdowns={countdowns} date={localCountdown} />
            </styles.LocalCountdown>
          ) : null}
        </FlexContainer>

        {countdowns.length ? (
          <styles.SavedCountdowns items="center" direction="column">
            <styles.Paragraph>saved countdowns</styles.Paragraph>

            <>
              {countdowns.map((countdown, key) => {
                return (
                  <SavedCountdown
                    key={countdown}
                    title={countdown}
                    index={key}
                    countdowns={countdowns}
                  />
                );
              })}
            </>
          </styles.SavedCountdowns>
        ) : null}
      </styles.Container>
    </FullScreenHeight>
  );
};

const mapStateToProps = (state) => {
  return {
    countdowns: state.countdowns.countdowns
  };
};

export default connect(mapStateToProps)(Garden);
