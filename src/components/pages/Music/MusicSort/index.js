import { Field, Form, Formik } from 'formik';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import theme from 'styles/theme';
import { above } from 'styles/utilities/breakpoints';
import { remHelper } from 'utils/remHelper';

const Container = styled(FlexContainer)`
  width: 100%;
  margin: ${remHelper[16]} 0;
  flex-direction: column;

  ${above.tablet`
    flex-direction: row;
  `}
`;

const StyledForm = styled(Form)`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;

  ${above.tablet`
    flex-wrap: no-wrap;
  `}
`;

const LabelContainer = styled(FlexContainer)`
  margin-right: ${remHelper[16]};
`;

const SelectContainer = styled(FlexContainer)`
  margin-top: ${remHelper[8]};
  width: 100%;

  ${above.tablet`
    margin-top: 0;
    width: auto;
  `}
`;

const CheckBox = styled(Field)`
  appearance: none;

  height: ${remHelper[16]};
  width: ${remHelper[16]};
  margin: 0 0 0 ${remHelper[8]};

  background-color: ${({ color }) => {
    return color;
  }};

  &:checked {
    ${({ color }) => {
      return `box-shadow: 0 0 0 1px white, 0 0 0 2px ${color}, 0 0 0 3px ${color};`;
    }}
  }
`;

const SelectInnerContainer = styled(FlexContainer)`
  margin-top: ${remHelper[8]};

  label {
    margin-right: ${remHelper[8]};
  }

  margin-right: ${remHelper[16]};

  ${above.tablet`
  margin-top: 0;
  `}
`;

const MusicSort = ({ handleFilterSort, artists }) => {
  return (
    <Container>
      <FlexContainer>
        <Formik
          initialValues={{
            wrote: false,
            produced: false,
            performed: false,
            chronology: 'order_ASC',
            artist: '',
          }}
          onSubmit={(values) => {
            const buildFilterArray = [
              { wrote: values.wrote },
              { produced: values.produced },
              { performed: values.performed },
            ];
            handleFilterSort(
              buildFilterArray,
              values.chronology,
              values.artist
            );
          }}
        >
          {({ values, setFieldValue, submitForm }) => {
            const handleFilterChange = ({ prop, value }) => {
              setFieldValue(prop, value);
              submitForm();
            };

            return (
              <StyledForm id="music-filter-sort-form">
                <LabelContainer>
                  <P as="label" htmlFor="music-filter-wrote">
                    wrote
                  </P>
                  <CheckBox
                    color={theme.light.yan.foreground}
                    type="checkbox"
                    name="wrote"
                    id="music-filter-wrote"
                    checked={values.wrote}
                    onChange={() => {
                      return handleFilterChange({
                        prop: 'wrote',
                        value: !values.wrote,
                      });
                    }}
                  />
                </LabelContainer>

                <LabelContainer>
                  <P as="label" htmlFor="music-filter-produced">
                    produced
                  </P>
                  <CheckBox
                    type="checkbox"
                    name="produced"
                    color={theme.light.yan.vinRouge}
                    id="music-filter-produced"
                    checked={values.produced}
                    onChange={() => {
                      return handleFilterChange({
                        prop: 'produced',
                        value: !values.produced,
                      });
                    }}
                  />
                </LabelContainer>

                <LabelContainer>
                  <P as="label" htmlFor="music-filter-performed">
                    performed
                  </P>
                  <CheckBox
                    type="checkbox"
                    name="performed"
                    color={theme.light.yan.lochmara}
                    id="music-filter-performed"
                    checked={values.performed}
                    onChange={() => {
                      return handleFilterChange({
                        prop: 'performed',
                        value: !values.performed,
                      });
                    }}
                  />
                </LabelContainer>

                <SelectContainer>
                  <SelectInnerContainer items="center">
                    <label htmlFor="chronology">
                      <P as="span">sort</P>
                    </label>

                    <select
                      name="chronology"
                      id="chronology"
                      value={values.chronology}
                      onChange={(e) => {
                        return handleFilterChange({
                          prop: 'chronology',
                          value: e.target.value,
                        });
                      }}
                    >
                      <option value="order_ASC">default</option>
                      <option value="releaseDateSort_DESC">most recent</option>
                      <option value="releaseDateSort_ASC">oldest</option>
                    </select>
                  </SelectInnerContainer>
                  <SelectInnerContainer items="center">
                    <label htmlFor="artist">
                      <P as="span">artist</P>
                    </label>

                    <select
                      name="artist"
                      id="artist"
                      onChange={(e) => {
                        return handleFilterChange({
                          prop: 'artist',
                          value: e.target.value,
                        });
                      }}
                    >
                      <option value="">all</option>
                      {artists.map((artist) => {
                        return (
                          <option key={artist} value={artist}>
                            {artist}
                          </option>
                        );
                      })}
                    </select>
                  </SelectInnerContainer>
                </SelectContainer>
              </StyledForm>
            );
          }}
        </Formik>
      </FlexContainer>
    </Container>
  );
};

export default MusicSort;
