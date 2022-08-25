import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const query = window.location.href
      .replace(window.location.origin, '')
      .replace('/', '');

    const regex = /d\d\d-\d\d-\d\d\d\dt\d\d:\d\d/;

    if (query.length && query.match(regex)) {
      const split = query.split('t');
      const [date, time] = split;

      setLocalCountdown(`${date.replace('d', '')} ${time}`);
    }
  }, []);

  return (
    <FlexContainer direction="column">
      <styles.H1>countdown garden</styles.H1>

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

        {countdowns.length ? (
          <styles.SavedCountdowns>
            <styles.Title>saved countdowns:</styles.Title>

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
      </styles.CountdownContainer>
    </FlexContainer>
  );
};

export default Garden;
