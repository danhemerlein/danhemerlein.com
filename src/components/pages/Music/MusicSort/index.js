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

const LabelText = styled(P)`
  display: block;
  margin-bottom: ${remHelper[8]};
`;

const FilterFieldset = styled(FlexContainer)`
  ${above.tablet`
    margin-right: ${remHelper[16]};
  `}
`;

const StyledForm = styled(Form)`
  display: flex;
`;

const LabelContainer = styled(FlexContainer)`
  margin-right: ${remHelper[8]};

  &:last-of-type {
    margin-right: 0;
  }
`;

const SortFieldset = styled.fieldset`
  margin-left: ${remHelper[16]};
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

  &:checked,
  &:focus {
    ${({ color }) => {
      return `box-shadow: 0 0 0 1px white, 0 0 0 2px ${color}, 0 0 0 3px ${color};`;
    }}
  }
`;

const MusicSort = ({ handleFilter }) => {
  return (
    <Container>
      <FilterFieldset as="fieldset">
        <LabelText as="legend">filter</LabelText>
        <Formik
          initialValues={{ wrote: false, produced: false, performed: false }}
          onSubmit={(values) => {
            console.log(values);
            const buildFilterObject = {
              wrote: values.wrote,
              produced: values.produced,
              performed: values.performed,
            };
            handleFilter(buildFilterObject);
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
                    onChange={(e) => {
                      return handleFilterChange({
                        prop: 'wrote',
                        value: !values.wrote,
                      });
                    }}
                    // disabled={!wroteAvailable}
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
                    onChange={(e) => {
                      return handleFilterChange({
                        prop: 'produced',
                        value: !values.produced,
                      });
                    }}
                    // disabled={!producedAvailable}
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
                    onChange={(e) => {
                      return handleFilterChange({
                        prop: 'performed',
                        value: !values.performed,
                      });
                    }}
                    // disabled={!performedAvailable}
                  />
                </LabelContainer>
              </StyledForm>
            );
          }}
        </Formik>
      </FilterFieldset>

      {/* <SelectContainer>
        <fieldset>
          <label>
            <LabelText as="span">sort</LabelText>

            <select
              onChange={(event) => {
                return handleSortChange(event);
              }}
              name="musicTimelineSort"
              id="musicTimelineSort"
              value={sortBy}
            >
              <option value="default">default</option>
              <option value="most-recent">most recent</option>
              <option value="oldest">oldest</option>
            </select>
          </label>
        </fieldset>

        <SortFieldset>
          <label>
            <LabelText as="span">artist</LabelText>
            <select
              onChange={(event) => {
                return handleArtistFilterChange(event);
              }}
              name="musicArtistSort"
              id="musicArtistSort"
              selected={artistFilter}
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
          </label>
        </SortFieldset>
      </SelectContainer> */}
    </Container>
  );
};

export default MusicSort;
