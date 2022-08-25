import { Field, Formik } from 'formik';
import { getDifference, hours } from 'utils/lib';
import * as styles from './DateForm.styles';

const DateForm = ({ today, setLocalCountdown }) => {
  return (
    <Formik
      initialValues={{ date: today, time: '12:00', AMPM: 'AM' }}
      onSubmit={(values, { setSubmitting }) => {
        let time;

        const [year, month, day] = values.date.split('-');

        if (values.AMPM === 'PM') {
          const hour = Number(values.time.split(':')[0]) + 12;
          time = `${hour}:${values.time.split(':')[1]}`;
        } else {
          time = values.time;
        }

        const countdownDate = `${month}-${day}-${year} ${time}`;

        if (getDifference(countdownDate) > 0) {
          setLocalCountdown(countdownDate);

          setSubmitting(false);
        }
        if (getDifference(countdownDate) < 0) {
          // toast(
          //   'please select a date / time combination that is in the future'
          // );
        }
      }}
    >
      {({ values, setFieldTouched, setFieldValue }) => {
        const setDateValue = (date) => {
          setFieldTouched('date', true, false);
          return setFieldValue('date', date);
        };

        const dateChangeHandler = (e) => {
          e.preventDefault();
          setDateValue(e.target.value);
        };
        return (
          <styles.StyledForm id="calenders">
            <styles.DateLabelContainer>
              <label htmlFor="date">date:</label>

              <input
                type="date"
                id="date"
                name="date"
                defaultValue={values.date}
                min={today}
                max="2122-12-31"
                onChange={dateChangeHandler}
              />
            </styles.DateLabelContainer>

            <styles.TimeLabelContainer>
              <label as="label" htmlFor="time">
                time:
              </label>

              <styles.SelectContainer>
                <Field as="select" name="time" id="time">
                  {hours.map((hour) => {
                    return (
                      <option value={hour} key={hour}>
                        {hour}
                      </option>
                    );
                  })}
                </Field>

                <Field as="select" name="AMPM" id="AMPM">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </Field>
              </styles.SelectContainer>
            </styles.TimeLabelContainer>

            <div>
              <styles.Button type="submit">create countdown</styles.Button>
            </div>
          </styles.StyledForm>
        );
      }}
    </Formik>
  );
};
export default DateForm;
